import React from 'react';
import { useMemo } from 'react';
import { useTable, useSortBy, useGlobalFilter, usePagination } from 'react-table';
import { DISPLAY_MODE } from "../utils/variables.js";

export default function RTable (props) {

	// const data = React.useMemo(
	// () => [
	  // {
		// col1: 'Hello',
		// col2: 'World',
	  // },
	  // {
		// col1: 'react-table',
		// col2: 'rocks',
	  // },
	  // {
		// col1: 'whatever',
		// col2: 'you want',
	  // },
	// ],
	// []
	// )

	const data = useMemo(
	(d = props.data) => d //Poistettu [] , jolloin päivittää taulukon aina kun data muuttuu
	//(d = props.data) => d, []
	)

	// const columns = React.useMemo(
	// () => [
	  // {
		// Header: 'Column 1',
		// accessor: 'col1', // accessor is the "key" in the data
	  // },
	  // {
		// Header: 'Column 2',
		// accessor: 'col2',
	  // },
	// ],
	// []
	// )
	const columns = useMemo(
	(h = props.cols) => h, []
	)  

	const GlobalFilter = ({
	  preGlobalFilteredRows,
	  globalFilter,
	  setGlobalFilter
	}) => {
		
	  const count = preGlobalFilteredRows && preGlobalFilteredRows.length;

	  return (
		<div className="global-filter">
			<div className="global-filter__buttons">
				<div className="filter-button" onClick={e => {setGlobalFilter("");}}>
				Kaikki kiekot
				</div>
				<div className="filter-button" onClick={e => {setGlobalFilter("Vaihtari");}}>
				Vaihtarit
				</div>
				<div className="filter-button" onClick={e => {setGlobalFilter("Bägi");}}>
				Bägikiekot
				</div>
				<div className="filter-button" onClick={e => {setGlobalFilter("Muu");}}>
				Ryhmä muut
				</div>
			</div>
			<div className="global-filter__caption">{globalFilter}</div>
		</div>
	  );
	};

  // const {
    // getTableProps,
    // getTableBodyProps,
    // headerGroups,
    // rows,
    // prepareRow,
  // } = useTable( { columns, data }, useSortBy )

  // Use the useTable hook to create your table configuration
/*   const instance = useTable(
    props,
    useGroupBy,
    useFilters,
    useSortBy,
    useExpanded,
    usePagination,
  ) */
  
	const instance = useTable(
		{
			columns,
			data,
			initialState: { 
				pageIndex: 0,
				hiddenColumns: ["col10"],
				globalFilter: DISPLAY_MODE
			}
		},
		useGlobalFilter,
		useSortBy,
		usePagination
	);

    const {
		getTableProps,
		getTableBodyProps,
		headerGroups,
		page,
		rows,
		prepareRow,
		state,
		state: { pageIndex, pageSize },
		visibleColumns,
		preGlobalFilteredRows,
		setGlobalFilter,
		canPreviousPage,
		canNextPage,
		pageOptions,
		pageCount,
		gotoPage,
		nextPage,
		previousPage,
		setPageSize		
	} = instance;
  

	return (
	<div  className="disc-table__content">
	{/*<div style={{color:'white'}} ><pre>
        <code>
          {JSON.stringify(
            {
              pageIndex,
              pageSize,
              pageCount,
              canNextPage,
              canPreviousPage,
            },
            null,
            2
          )}
        </code>
      </pre>
	</div>*/}
		<table className="react-table" {...getTableProps()}>
		  <caption className="react-table__caption">
			<div className="react-table__caption-1">Suodata tiedot</div>
			<div className="react-table__caption-2">
				<GlobalFilter
					preGlobalFilteredRows = {preGlobalFilteredRows}
					globalFilter = {state.globalFilter}
					setGlobalFilter = {setGlobalFilter}
				/>
			</div>
		  </caption>
		  <thead className="react-table__thead" >
			{headerGroups.map(headerGroup => (
			  <tr className="react-table__tr" {...headerGroup.getHeaderGroupProps()}>
				{headerGroup.headers.map(column => (
				  <th className="react-table__th"
					{...column.getHeaderProps( column.getSortByToggleProps() )}
				  >
					{column.render('Header')}<pre> </pre>
					<span className="react-table__th__sort-icon">
						{column.isSorted
						  ? column.isSortedDesc
							? ' ▼'
							: ' ▲'
						  : '▲▼'}
					</span>
				  </th>
				))}
			  </tr>
			))}
		  </thead>
		  <tbody className="react-table__body" {...getTableBodyProps()}>
			{page.map(row => {
			  prepareRow(row)
			  return (
				<tr className="react-table__body__tr" {...row.getRowProps()}>
				  {row.cells.map(cell => {
					return (
					  <td className="react-table__body__td"
						{...cell.getCellProps()}
					  >
						{cell.render('Cell')}
					  </td>
					)
				  })}
				</tr>
			  )
			})}
		  </tbody>
		</table>
		<div className="pagination">
			<button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
			  {'<<'}
			</button>{' '}
			<button onClick={() => previousPage()} disabled={!canPreviousPage}>
			  {'<'}
			</button>{' '}
			<button onClick={() => nextPage()} disabled={!canNextPage}>
			  {'>'}
			</button>{' '}
			<button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
			  {'>>'}
			</button>{' '}
			<span style={{color:'whitesmoke'}}>
			  Page{' '}
			  <strong>
				{pageIndex + 1} of {pageOptions.length}
			  </strong>{' '}
			</span>
			<span style={{color:'whitesmoke'}}>
			  | Go to page:{' '}
			  <input
				type="number"
				defaultValue={pageIndex + 1}
				onChange={e => {
				  const page = e.target.value ? Number(e.target.value) - 1 : 0
				  gotoPage(page)
				}}
				style={{ width: '100px' }}
			  />
			</span>{' '}
			<select
			  value={pageSize}
			  onChange={e => {
				setPageSize(Number(e.target.value))
			  }}
			>
			  {[10, 20, 30, 40, 50].map(pageSize => (
				<option key={pageSize} value={pageSize}>
				  Show {pageSize}
				</option>
			  ))}
			</select>
		</div>		
	</div>
	)
}
