import Pagination from '@mui/material/Pagination';
import { List, Paper } from '@mui/material';
export default function PaginatedClassList({page, setPage, numPages, children}){
  return (
    <div>
      <Paper elevation={6}>
        <List style={{height: '500px', overflow: 'auto'}}>
          {children}

        </List>

      </Paper>
      <Pagination count={numPages} page={page} onChange={(event, value) => setPage(value)}/>
    </div>


  )

}
