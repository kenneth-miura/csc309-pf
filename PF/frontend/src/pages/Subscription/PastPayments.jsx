import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import dayjs from "dayjs";
import Pagination from '@mui/material/Pagination';

function getDate(datetimeString){
  return dayjs(datetimeString).format("DD/MM/YY")

}

export default function PastPayments() {
  const [page, setPage] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [pastPayments, setPastPayments] = useState([])

  useEffect(
    () => {
      const cookie = new Cookies();
      const bearer = "Bearer " + cookie.get("accessToken");
      const url = "http://127.0.0.1:8000/subscriptions/payment_history/?" + new URLSearchParams({
        page: page
      });
      fetch(url, {
        method: "GET",
        headers: {
          Accept: "application/json",
          Authorization: bearer,
          "Content-Type": "application/json",
        },
        }).then(res => {
          if (res.status !== 200){
            setPastPayments([])
            throw new Error(res.status)
          }
          return res.json()
        }).then(data => {
          setPastPayments(data.items)
          setNumPages(data.num_pages)
        }).catch(error => console.error(error))
    }, [page]
  )


  return (
    <TableContainer  sx={{ minWidth: "400px", maxHeight: 300 }} component={Paper}>
      <Table aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Date</TableCell>
            <TableCell align="right">Amount</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {pastPayments.map(payment => (
            <TableRow
              key={payment.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {getDate(payment.datetimeString)}
              </TableCell>
              <TableCell align="right">${payment.amount}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    <Pagination count={numPages} page={page} onChange={(event, value) => setPage(value)}/>
    </TableContainer>
  );
}
