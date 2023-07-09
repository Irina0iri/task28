import styled from '@emotion/styled';
import { Modal, Paper, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow } from '@mui/material';
import bookData from './books.json';
import {useState} from "react";

const tableHeader = ["ID", "TITLE", "AUTHOR", "GENRE", "DESCRIPTION", "ACTION"];

const BooksTable = () => {
    const [open, setOpen] = useState(false);
    const [bookImg, setBookImg] = useState(undefined);
    const [books, setBooks] = useState(bookData);

    const handleOpen = (bookImage) => {
        setOpen(true);
        setBookImg(bookImage);
    }

    const StyledTableCell = styled(TableCell)(() => ({
        [`&.${tableCellClasses.head}`]: {
            padding: '0px',
            borderBottom: '3px solid',
        },
        [`&.${tableCellClasses.body}`]: {
            padding: '0px',
            borderBottom: '2px solid',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
        },
    }));

    const StyledTableRow = styled(TableRow)(() => ({
        '&:nth-of-type(odd)': {
            backgroundColor: '#edaa7e',
        },
        '&:nth-of-type(even)': {
            backgroundColor: '#f5ea98',
        },
        '&:hover': {
            cursor: 'pointer',
        },
    }));

    return (
        <div>
            <TableContainer component={Paper} >
                <Table aria-label="customized table" style={{margin: '10px 10px 5% 5%', overflow: 'hidden', tableLayout: 'fixed', width: '90%', fontFamily: `Monospaced`}}>
                    <TableHead>
                        <TableRow>
                            {tableHeader.map((header) => <StyledTableCell key={header} align="center">{header}</StyledTableCell>)}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {books.map((book) => (
                            <StyledTableRow key={book.id}>
                                {Object.entries(book).map(([key, value]) => (
                                    tableHeader.includes(key.toLocaleUpperCase()) &&
                                    <StyledTableCell key={`${key}-${book.id}`} align="center" onClick={() => handleOpen(book.image)}>{value}</StyledTableCell>
                                ))}
                                <StyledTableCell key={`action-${book.id}`} align="center">
                                    <button style={{
                                        color: 'black',
                                        border: '1px black solid',
                                        cursor: 'pointer'
                                    }}
                                            onClick={() => setBooks(books.filter((item) => item.id !== book.id))}>DELETE ROW</button>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
                style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
                <img src={bookImg} style={{padding:'30px 200px 30px 200px', backgroundColor: 'white'}} />
            </Modal>
        </div>
    );
};

export default BooksTable;