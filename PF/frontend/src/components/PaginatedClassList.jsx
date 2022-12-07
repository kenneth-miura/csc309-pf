import Pagination from '@mui/material/Pagination';
import { List } from '@mui/material';
export default function PaginatedClassList({page, setPage, numPages, children}){
  return (
    <div>
      <List style={{maxHeight: '500px', overflow: 'auto'}}>
        {children}

      </List>
      <Pagination count={numPages} page={page} onChange={(event, value) => setPage(value)}/>
    </div>


  )

}
