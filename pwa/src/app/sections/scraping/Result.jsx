import Table from '../../../components/Table';
const td  = [
              {
                label:"Item",
                value:"url",
                align:"left"
              },
              {
                label:"Scrapear",
                value:"scrapear",
                align:"left"
              },
              {
                label:"Acción",
                align:"center",
                items:["edit","destroy"]
              },
            ]
const App=()=>{
  return  <Table td={td} add={true}/>
}
export default App
