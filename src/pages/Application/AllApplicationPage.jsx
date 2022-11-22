import { CButton, CButtonGroup, CCard, CTable } from "@coreui/react"

// const AllApplicationPage = () => {
//   const columns = [
//     {
//       key: 'id',
//       label: '#',
//       _props: { scope: 'col' },
//     },
//     {
//       key: 'class',
//       _props: { scope: 'col' },
//     },
//     {
//       key: 'heading_1',
//       label: 'Heading',
//       _props: { scope: 'col' },
//     },
//     {
//       key: 'heading_2',
//       label: 'Heading',
//       _props: { scope: 'col' },
//     }
//   ]
//   const items = [
//     {
//       id: 1,
//       class: 'Mark',
//       heading_1: 'Otto',
//       heading_2: '@mdo',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 2,
//       class: 'Jacob',
//       heading_1: 'Thornton',
//       heading_2: '@fat',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 3,
//       class: 'Larry the Bird',
//       heading_2: '@twitter',
//       _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
//     },
//     {
//       id: 1,
//       class: 'Mark',
//       heading_1: 'Otto',
//       heading_2: '@mdo',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 2,
//       class: 'Jacob',
//       heading_1: 'Thornton',
//       heading_2: '@fat',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 3,
//       class: 'Larry the Bird',
//       heading_2: '@twitter',
//       _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
//     },
//     {
//       id: 1,
//       class: 'Mark',
//       heading_1: 'Otto',
//       heading_2: '@mdo',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 2,
//       class: 'Jacob',
//       heading_1: 'Thornton',
//       heading_2: '@fat',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 3,
//       class: 'Larry the Bird',
//       heading_2: '@twitter',
//       _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
//     },
//     {
//       id: 1,
//       class: 'Mark',
//       heading_1: 'Otto',
//       heading_2: '@mdo',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 2,
//       class: 'Jacob',
//       heading_1: 'Thornton',
//       heading_2: '@fat',
//       _cellProps: { id: { scope: 'row' } },
//     },
//     {
//       id: 3,
//       class: 'Larry the Bird',
//       heading_2: '@twitter',
//       _cellProps: { id: { scope: 'row' }, class: { colSpan: 2 } },
//     },
//   ]

//   return (
//     <CCard className="mx-auto col-md-8 my-3">
//       <br />
//       <CButtonGroup role="group" aria-label="Basic mixed styles example" className="mx-2 col-md-3">
//         <CButton color="danger">Kopyala</CButton>
//         <CButton color="warning">Excel</CButton>
//         <CButton color="success">Pdf</CButton>
//       </CButtonGroup>
//       <br />
//       <CTable
//         id="datatable-buttons"
//         className="table table-striped table-bordered dt-responsive nowrap"
//         style={{ borderCollapse: 'collapse', borderSpacing: '0', width: '100%' }}
//         columns={columns}
//         items={items}
//       />
//     </CCard>
//   )
// }
// export default AllApplicationPage


const AllApplicationPage = () => {
  return (


    <DataTable
      isFilterable
      defaultColumnValues={{ Filter: TextFilter }}
      numBreakoutFilters={2}
      columns={[
        {
          Header: 'Name',
          accessor: 'name',

        },
        {
          Header: 'Age',
          accessor: 'age',
          Filter: MultiSelectDropdownFilter,
          filter: 'includesValue',
          filterChoices: [
            {
              name: 'Four',
              value: 4,
            },
            {
              name: 'One',
              value: 1,
            },
            {
              name: 'Twelve',
              value: 12,
            },
            {
              name: 'Nine',
              value: 9,
            },
            {
              name: 'Seventeen',
              number: 17,
              value: 17,
            },
          ]
        },
        {
          Header: 'Famous For',
          accessor: 'famous_for',
        },
        {
          Header: 'Coat Color',
          accessor: 'color',
          Filter: CheckboxFilter,
          filter: 'includesValue',
          filterChoices: [{
            name: 'russian white',
            number: 1,
            value: 'russian white',
          },
          {
            name: 'orange tabby',
            number: 2,
            value: 'orange tabby',
          },
          {
            name: 'brown tabby',
            number: 3,
            value: 'brown tabby',
          },
          {
            name: 'siamese',
            number: 1,
            value: 'siamese',
          }]
        },
      ]}
      itemCount={7}
      data={[
        {
          name: 'Lil Bub',
          color: 'brown tabby',
          famous_for: 'weird tongue',
          age: 4,
        },
        {
          name: 'Grumpy Cat',
          color: 'siamese',
          famous_for: 'serving moods',
          age: 4,
        },
        {
          name: 'Smoothie',
          color: 'orange tabby',
          famous_for: 'modeling',
          age: 1,
        },
        {
          name: 'Maru',
          color: 'brown tabby',
          famous_for: 'being a lovable oaf',
          age: 12,
        },
        {
          name: 'Keyboard Cat',
          color: 'orange tabby',
          famous_for: 'piano virtuoso',
          age: 9,
        },
        {
          name: 'Long Cat',
          color: 'russian white',
          famous_for:
            'being loooooooooooooooooooooooooooooooooooooooooooooooooooooong',
          age: 9,
        },
        {
          name: 'Zeno',
          color: 'brown tabby',
          famous_for: 'getting halfway there',
          age: 17,
        },
      ]}

    />












  )
}
export default AllApplicationPage

