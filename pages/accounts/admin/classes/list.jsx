import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/client'
import Layout from '../../../../components/Layout'
import { useRouter } from 'next/router'
import AdminLayout from '../../../../components/AdminLayout'
import AdminClassesLayout from '../../../../components/AdminClassesLayout'
import ClassCard from '../../../../components/ClassCard'
import db from '../../../../db.js'

export default function Page() {
  const router = useRouter()
  const [session, loading] = useSession()
  const [classesData, setClassesData] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [cardsPerPage, setCardsPerPage] = useState(6)

  useEffect(() => {
    if (!loading && !session) router.push({ pathname: '/' })
  }, [session])

  useEffect(() => {
    db.classes.getClasses().then((res) => setClassesData(res.data))
  }, [])

  const deleteClass = (id) => {
    db.classes.deleteClass(id)
    db.classes.getClasses().then((res) => setClassesData(res.data))
  }

  const indexOfLastCard = currentPage * cardsPerPage
  const indexOfFirstCard = indexOfLastCard - cardsPerPage
  const currentCards = classesData.slice(indexOfFirstCard, indexOfLastCard)

  const classesCards = () => {
    return currentCards.map((classesData) => {
      return (
        <ClassCard
          key={classesData.id}
          id={classesData.id}
          name={classesData.name}
          offprice={classesData.offline_price}
          onprice={classesData.online_price}
          attend={classesData.attendences}
          deletion={deleteClass}
        />
      )
    })
  }

  const paginate = (pageNumber) => {
    //e.preventDefault()
    // e.target.style.background == 'white'
    //   ? (e.target.style.background = 'red')
    //   : (e.target.style.background = 'white')
    // console.log(e.target.style.background)
    setCurrentPage(pageNumber)
  }

  const Pagination = ({ cardsPerPage, totalCards, paginate }) => {
    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
      pageNumbers.push(i)
    }

    return (
      <div className='bottomPagination'>
        <ul className='pagination'>
          {pageNumbers.map((number) => (
            <li key={number} className='page-item'>
              <button
                onClick={(e) => {
                  e.preventDefault()
                  e.target.style.background = 'red'
                  paginate(number)
                }}
                id={`pagination${number}`}
              >
                {number}
              </button>
            </li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <Layout activeTab={'account'}>
      <AdminLayout activeTab={'classes'}>
        <AdminClassesLayout activeTab={'list'}>
          <div className='class-body'>{classesCards()}</div>
          <Pagination
            cardsPerPage={cardsPerPage}
            totalCards={classesData.length}
            paginate={paginate}
          />
        </AdminClassesLayout>
      </AdminLayout>
    </Layout>
  )
}
