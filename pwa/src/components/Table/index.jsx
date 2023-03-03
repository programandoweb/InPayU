import * as React from 'react';
import {useState,useEffect} from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Pagination from '@mui/material/Pagination';
import Grid from '@mui/material/Grid';
import StateContext from '../../helpers/ContextState';
import Loading from '@mui/material/LinearProgress';
import { useLocation } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { NavLink } from "react-router-dom";



import Search from './Search';


const ICONS           = {
  "edit":EditIcon,
  "destroy":DeleteIcon,
  "view":SearchIcon,
  "activity":AdUnitsIcon,
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: "#a5c206",
    color: theme.palette.common.black,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

// const StyledTableRow = styled(TableRow)(({ theme }) => ({
//   '&:nth-of-type(odd)': {
//     backgroundColor: theme.palette.action.hover,
//   },
//   // hide last border
//   '&:last-child td, &:last-child th': {
//     border: 0,
//   },
// }));

let endpoint_delete = false
let getInit
const queryString   =   window.location.search;
const urlParams     =   new URLSearchParams(queryString);
let current         =   (parseInt(urlParams.get('page')))?parseInt(urlParams.get('page')):1

export default function CustomizedTables({td,extra,reload,setReload,add,component,skipHeader,prefixed}) {
  const location                        = useLocation();
  const navigate                        = useNavigate();
  const context                         = React.useContext(StateContext);
  const [rows, setRows]                 = useState([]);
  const [pages, setPages]               = useState([]);
  const [loading, setLoading]           = useState(false);

  useEffect(() => {
    if (reload && setReload) {
      setReload(false)
      getInit(true)
    }
  }, [reload,setReload]);

  useEffect(() => {
    current = 1
    let mounted =   true
    getInit(mounted)
    return function cleanup() {
      mounted   =   false
    }
  }, [location.pathname]);



  getInit=(mounted,filter)=>{
    setLoading(true)
    if (filter || filter==='') {
      setPages([])
    }
    if (prefixed) {
      prefixed  = "/"+prefixed
    }else {
      prefixed  = ""
    }
    let endpoint_ = "api"+prefixed+location.pathname+location.search

    let ext       = ""
    if (filter===undefined) {
      filter=""
    }
    if (!endpoint_.includes("?page")) {
      ext   +=  "?search="+filter
    }else {
      ext   +=  "&search="+filter
    }

    endpoint_delete=endpoint_
    context.get(endpoint_+ext,{...context.user},false,false).then((response)=>{
      if (response && response.data && response.data.data) {
        setRows(response.data.data)
      }
      if (response && response.data && response.data.links && pages.length===0) {
        setPages(response.data.links)
      }
      setLoading(false)
    })
  }

  const onChange=(event,page)=>{
    location.search="?page="+page
    navigate(location.pathname+"?page="+page)
    getInit(true)
  }


  const deleteItem=(row)=>{
    context.setModalShow({
                    show:true,
                    title:"Atención",
                    message:  <Grid container direction="row">
                                <Grid item xs={12} sx={{ mt: 1,mb: 1, p:0 }}>
                                  ¿Seguro desea eliminar este registro?
                                </Grid>
                                <Grid item xs={6} align="center">
                                  <Button fullWidth variant="contained" color="purple" onClick={()=>{deleteSend(row);context.setModalShow(false);}}>Si</Button>
                                </Grid>
                                <Grid item xs={6} align="center">
                                  <Button fullWidth variant="outlined" color="primary" onClick={()=>context.setModalShow(false)}>No</Button>
                                </Grid>
                              </Grid>,
                    size:""
                  }
                )

  }

  const deleteSend=(row)=>{
    context.post(endpoint_delete+"/delete",{...row},false,false).then((response)=>{
      getInit(true)
    })
  }

  return (
    <>
      {!skipHeader?<Grid  item xs={12}>
        <Grid container justifyContent="start" >
          <Grid  item xs={12} md={2} >
            {component}
          </Grid>
          <Grid  item xs={0} md={6} align="right">
            {add?<Button component={NavLink} to="add" variant="contained" sx={{mr:1}} color="green"><AddIcon/></Button>:false}
          </Grid>
          <Grid  item xs={12} md={4}>
            <Search placeHolder="Buscar..." name="search" loading={loading} getInit={getInit} add={add} sx={{ mb: 0, mt: 0, width: '100%' }}/>
          </Grid>
        </Grid>
      </Grid>:false}
      <Grid container justifyContent="center" >
        <Grid item xs={12} sx={{ mt: 1,mb: 1, p:0 }}>
            <TableContainer component={Paper}>
              {td?<>
                <Table  aria-label="customized table">
                  <TableHead>
                    <TableRow>
                      {td.map((row,key)=>{
                        return  <StyledTableCell key={key} width={row.label==='Acción'?100:""}  align={row.align?row.align:"left"}>
                                  {row.label}
                                </StyledTableCell>
                      })}
                    </TableRow>
                  </TableHead>
                  {
                    !loading && rows.length>0?<TableBody>
                                {rows.map((row,key1) => (
                                  <TableRow key={key1}>
                                    {td.map((row2,key2)=>{
                                      let custom  = false
                                      if (row2.value && row2.value.includes(".")) {
                                        const spliter =   row2.value.split(".")
                                        if (row && spliter && spliter.length>0 && spliter[0] && spliter[1] && row[spliter[0]] && row[spliter[0]][spliter[1]]) {
                                          custom        =   row[spliter[0]][spliter[1]];
                                        }
                                      }
                                      return  <StyledTableCell key={key2} width={row2.label==='Acción'?100:""}  align={row2.align?row2.align:"left"} className={ row[row2.value] + " items "}>
                                                  {(row && row2.value) && row[row2.value] && (row2.type!=="img" && row2.type!=="url")?<>
                                                      {row[row2.value]}
                                                    </>:(row && row2.value) && row[row2.value] && (row2.type==="img" && row2.type!=="url")?<>
                                                      <img src={row[row2.value]} alt="Programandoweb" height="100"/>
                                                    </>:(row && row2.value) && row[row2.value] && (row2.type!=="img" && row2.type==="url")?<>
                                                      <a rel="noreferrer" href={row[row2.value]} target="_blank">URL</a>
                                                    </>:row[row2.value]===null?<>
                                                      No definido
                                                    </>:<>
                                                    {row2 && row2.items?<>
                                                      {row2.items.map((row3,key3)=>{
                                                        let HtmlIcon
                                                        if (ICONS[row3]) {
                                                          HtmlIcon=ICONS[row3]
                                                        }else {
                                                          return <span key={key3}>{row3}</span>
                                                        }
                                                        if (row[row3] &&  row3!=='destroy' ) {
                                                          return  <NavLink key={key3} to={row[row3]}><HtmlIcon></HtmlIcon></NavLink>
                                                        }else if (row[row3] &&  row3==='destroy' ) {
                                                          return  <span key={key3} onClick={()=>deleteItem(row)} className="cursor-pointer"><HtmlIcon></HtmlIcon></span>
                                                        }else {
                                                          return false
                                                        }
                                                      })}
                                                    </>:row2.value.includes(".")?<div className={ custom + " items_custom "}>{custom}</div>:false}
                                                  </>}
                                              </StyledTableCell>
                                    })}
                                  </TableRow>
                                ))}
                              </TableBody>:loading &&rows.length===0?<TableBody>
                                <TableRow>
                                  <StyledTableCell align={"center"} colSpan={td.length}>
                                    {"Buscando información"}
                                  </StyledTableCell>
                                </TableRow>
                              </TableBody>:<TableBody>
                                <TableRow>
                                  <StyledTableCell align={"center"} colSpan={td.length}>
                                    {"No hay datos que mostrar"}
                                  </StyledTableCell>
                                </TableRow>
                              </TableBody>
                  }

                </Table>
                {loading?<Loading color="secondary"/>:false}
                <Grid container direction="row">
                  <Grid item xs={12}  sx={{ mt: 1,mb: 1, p:0 }}>
                    <Pagination defaultPage={current}
                                onChange={onChange}
                                count={(pages.length===3?pages.length-2:pages.length-2)}
                                shape="rounded"
                                color="secondary"
                                siblingCount={1}
                                boundaryCount={1}/>
                  </Grid>
                </Grid>
              </>:false}
            </TableContainer>
          </Grid>
        </Grid>
    </>
  );
}
