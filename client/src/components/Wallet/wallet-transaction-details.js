import React , {useState} from 'react';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';

const TransactionDetails=(props)=>{
    const { SearchBar } = Search;
    const columns = [{
      dataField: '_id',
      text: 'Transaction Id'
    }, {
      dataField: 'walletid',
      text: 'Wallet Id'
    }, {
      dataField: 'amount',
      text: 'Amount'
    },{
      dataField: 'balance',
      text: 'Balance'
    },
    {
       dataField: 'description',
       text: 'Description'
    },{
       dataField: 'createdAt',
       text: 'Date'
    },{
       dataField: 'type',
       text: 'Type'
    }];
    
    const afterSearch = (newResult) => {
      console.log(newResult);
    };

    return (
    
    <ToolkitProvider
      keyField="id"
      data={ props.userTransDetails }
      columns={ columns }
      search={ { afterSearch } }
    >
      {
        props => (
          <div>
            <p>Transaction Details</p>
            <SearchBar { ...props.searchProps } />
            <BootstrapTable
              { ...props.baseProps }
            />
          </div>
        )
      }
    </ToolkitProvider>
    )
}

export default TransactionDetails;
