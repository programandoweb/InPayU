import Table from '../../../components/Table';
const td  = [
              {
                label:"Item",
                value:"label",
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
