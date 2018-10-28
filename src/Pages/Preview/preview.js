import React from 'react'
import ReactTable from "react-table"
import "react-table/react-table.css"

export default function preview({ data }) {

  const columns = [
    {
      id: 'name',
      Header: 'Name',
      accessor: data => data.email
    },
    {
      id: 'email',
      Header: 'Email',
      accessor: data => data.email
    }
  ]

  return (
    <div>
      <ReactTable
        data={data}
        columns={columns}
      />
    </div>
  )
}

