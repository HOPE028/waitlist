import React, { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { useAuth } from '../contexts/AuthContext'
import { db } from '../firebase-config'
import {
  collection,
  getDocs,
  addDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
  increment,
  deleteDoc,
} from 'firebase/firestore'
import DashBoardLink from './DashBoardLink'

export default function Infant() {
  const { currentUser } = useAuth()
  const [showInputs, setShowInputs] = useState(false)
  const [waitList, setWaitList] = useState([])
  const [childrenVisible, setChildrenVisible] = useState([])
  const [stat, setStat] = useState('')
  const [currentUserInfo, setCurrentUserInfo] = useState()
  const [showList, setShowList] = useState(false)
  const [kidsAvailable, setKidsAvailable] = useState(false)

  const [childEdited, setChildEdited] = useState()

  let childListCollectionRef
  const waitListCollectionRef = collection(db, 'Infants')
  const statsCollectionRef = doc(db, 'Stats', 'infantAgeID')
  let currentUserCollectionRef

  // new child info state

  useEffect(() => {
    if (currentUser) {
      childListCollectionRef = collection(db, 'Users', currentUser.uid, 'kids')
      currentUserCollectionRef = doc(db, 'Users', currentUser.uid)
      getChildrenID()
      getCurrentUser()
    }
  }, [currentUser])

  const getChildrenID = () => {
    const getData = async () => {
      const data = await getDocs(childListCollectionRef)
      setChildrenVisible(
        data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      )
    }
    getData()
    setShowList(true)
  }

  const getCurrentUser = async () => {
    const getUser = async () => {
      const user = await getDoc(currentUserCollectionRef)

      setCurrentUserInfo(user)
    }
    getUser()
  }

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(waitListCollectionRef)
      setWaitList(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })))
    }
    const getStat = async () => {
      const stats = await getDoc(statsCollectionRef)
      setStat(stats)
    }
    getData()
    getStat()
  }, [])

  const changeShowInputs = () => {
    if (!showInputs) setShowInputs(true)
    else {
      if (
        window.confirm(
          'Are you sure you want to close the box? If done, all information entered will be cleared'
        )
      ) {
        setShowInputs(false)
      }
    }
  }

  const handleEdit = (child) => {
    if (childEdited == null) setChildEdited(child)
    else {
      if (
        window.confirm(
          'Are you sure you want to close the box? If done, all information entered will be cleared'
        )
      ) {
        if (childEdited == child) {
          setChildEdited(null)
        } else {
          setChildEdited(child)
        }
      }
    }
  }

  const handleDelete = async (child) => {
    if (window.confirm(`Delete ${child.name}'s account?`)) {
      const childRef = doc(db, 'Infants', child.id)
      const childRefUnderUser = doc(
        db,
        'Users',
        currentUser.uid,
        'kids',
        child.id
      )

      try {
        await deleteDoc(childRef)
        await deleteDoc(childRefUnderUser)
      } catch (error) {
        console.log(error)
        return
      }

      window.location.reload()
    }
  }

  return (
    <div>
      <Navbar></Navbar>
      <DashBoardLink />
      <div className='flex-container'>
        <div className='content-waitlist'>
          <h3 className='top-right-80 seven-hundred current-user'>
            Current User:{' '}
            {currentUserInfo &&
              currentUserInfo._document.data.value.mapValue.fields.displayName
                .stringValue}
          </h3>
          <h1>Infant Waitlist</h1>
          {stat && (
            <h2>
              Current Waitlist Size:{' '}
              {stat._document.data.value.mapValue.fields.size.integerValue}
            </h2>
          )}
          {!showInputs && (
            <button onClick={changeShowInputs} className='open-box'>
              Add your child to the Waitlist?
            </button>
          )}
          {showInputs && (
            <NewChild
              changeShowInputs={changeShowInputs}
              order={
                stat._document.data.value.mapValue.fields.size.integerValue
              }
              statsCollectionRef={statsCollectionRef}
            />
          )}

          {showList && (
            <div className='container'>
              <h2 className='margin-top'>
                Children You Registered In This Waitlist:
              </h2>
              <div className='container-child-info'>
                {waitList
                  .filter((child) => {
                    for (let a = 0; a < childrenVisible.length; a++) {
                      if (child.id === childrenVisible[a].id) return child
                    }
                  })
                  .map((child) => {
                    if (kidsAvailable == false) setKidsAvailable(true)
                    return (
                      <div
                        key={child.id}
                        className='container-container-child-info '
                      >
                        {childEdited == child ? (
                          <EditChild
                            child={childEdited}
                            exitButton={handleEdit}
                          />
                        ) : (
                          <div className='content-child-info'>
                            <button
                              onClick={() => handleEdit(child)}
                              className='top-left control-child-info'
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDelete(child)}
                              className='top-right control-child-info'
                            >
                              Delete
                            </button>
                            <h3>{child.name}</h3>
                            <h4 className='blue'>
                              Order: {child.order >= 3 ? child.order : '>3'}
                            </h4>
                            <h4>Child Age: {child.age}</h4>
                            <h4>
                              Parent Contact Info: {child.parentsContactInfo}
                            </h4>
                            <h4>Parent Name: {child.parentsName}</h4>
                          </div>
                        )}
                      </div>
                    )
                  })}
              </div>
              {!kidsAvailable && (
                <h3 className='no-kids-warning'>
                  It Looks Like You Have No Children In This Waitlist..
                </h3>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// RIGHT HEREEEE

function EditChild(props) {
  const { currentUser } = useAuth()

  const [error, setError] = useState('')

  const [childName, setChildName] = useState('')
  const [parentsName, setParentsName] = useState('')
  const [parentsContactInfo, setParentContactInfo] = useState('')
  const [age, setAge] = useState(-1)

  const handleClick = async () => {
    setError('')

    if (!currentUser) {
      setError(
        'Loading User Information. Please wait 3 seconds, then try again'
      )
      return
    }

    let finalChildName
    let finalParentsName
    let finalParentsContactInfo
    let finalAge

    if (childName === '') finalChildName = props.child.name
    else finalChildName = childName

    if (parentsName === '') finalParentsName = props.child.parentsName
    else finalParentsName = parentsName

    if (parentsContactInfo === '')
      finalParentsContactInfo = props.child.parentsContactInfo
    else finalParentsContactInfo = parentsContactInfo

    if (age === '') finalAge = props.child.age
    else finalAge = age

    try {
      const childRef = doc(db, 'Infants', props.child.id)

      await updateDoc(childRef, {
        age: finalAge,
        name: finalChildName,
        parentsContactInfo: finalParentsContactInfo,
        parentsName: finalParentsName,
      })
    } catch (error) {
      console.log(error)
      setError('Something went wrong.. Please try again')
      return
    }

    window.location.reload()
  }

  return (
    <div className='flex-container'>
      <div className='add-info-content'>
        <h1 className='add-info-leave'>
          <button
            style={{
              background: 'none',
              border: 'none',
              margin: 0,
            }}
            className='add-info-leave-button'
            onClick={() => props.exitButton(props.child)}
          >
            X
          </button>
        </h1>

        <h2>Edit: {props.child.name}</h2>

        {error !== '' && <h3 className='error'>{error}</h3>}
        <h4>Child Full Name:</h4>
        <input
          type='text'
          onChange={(event) => setChildName(event.target.value)}
          placeholder={props.child.name}
        />

        <h4>Child Age:</h4>
        <input
          type='number'
          onChange={(event) => setAge(event.target.value)}
          placeholder={props.child.age}
        />
        <h4>Parent Full Name:</h4>
        <input
          type='text'
          onChange={(event) => setParentsName(event.target.value)}
          placeholder={props.child.parentsName}
        />
        <h4>Parents Phone Number:</h4>
        <input
          type='tel'
          onChange={(event) => setParentContactInfo(event.target.value)}
          placeholder={props.child.parentsContactInfo}
        />

        <button onClick={handleClick} className='white'>
          Update!
        </button>
      </div>
    </div>
  )
}

//NOT THIS ONE

function NewChild(props) {
  const { currentUser } = useAuth()

  const [error, setError] = useState('')

  const [childName, setChildName] = useState('')
  const [parentsName, setParentsName] = useState('')
  const [parentsContactInfo, setParentContactInfo] = useState('')
  const [age, setAge] = useState(-1)

  const handleClick = async () => {
    setError('')

    if (!currentUser) {
      setError('Loading User Information. Please wait 3 seconds then try again')
      return
    }

    if (
      childName === '' ||
      parentsName === '' ||
      age === -1 ||
      parentsContactInfo === ''
    ) {
      setError('Please Fill In All Fields')
      return
    }

    try {
      const kidsCollectionRef = collection(db, 'Users', currentUser.uid, 'kids')

      const document = await addDoc(kidsCollectionRef, { ageGroup: 'Infant' })

      const infantCollectionRef = doc(db, 'Infants', document.id)

      const currentOrder = Number(props.order) + 1

      await setDoc(infantCollectionRef, {
        name: childName,
        parentsName: parentsName,
        age: age,
        parentsContactInfo: parentsContactInfo,
        order: currentOrder,
      })

      await updateDoc(props.statsCollectionRef, {
        size: increment(1),
      })
    } catch (error) {
      console.log(error)
      setError('Something went wrong.. Please try again')
      return
    }

    window.location.reload()
  }

  return (
    <div className='flex-container'>
      <div className='add-info-content'>
        <h1 className='add-info-leave'>
          <button
            style={{
              background: 'none',
              border: 'none',
              margin: 0,
            }}
            className='add-info-leave-button'
            onClick={props.changeShowInputs}
          >
            X
          </button>
        </h1>

        <h2>Please Fill In All Information </h2>

        {error !== '' && <h3 className='error'>{error}</h3>}
        <h4>Child Full Name:</h4>
        <input
          type='text'
          onChange={(event) => setChildName(event.target.value)}
        />

        <h4>Child Age:</h4>
        <input type='number' onChange={(event) => setAge(event.target.value)} />
        <h4>Parent Full Name:</h4>
        <input
          type='text'
          onChange={(event) => setParentsName(event.target.value)}
        />
        <h4>Parents Phone Number:</h4>
        <input
          type='tel'
          onChange={(event) => setParentContactInfo(event.target.value)}
        />
        <button onClick={handleClick} className='white font-size-20'>
          Submit!
        </button>
      </div>
    </div>
  )
}
