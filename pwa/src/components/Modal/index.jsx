import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CampaignIcon from '@mui/icons-material/Campaign';
import './index.css';

export default function KeepMountedModal({open,setOpen,text}) {
  //const handleClose = () => setOpen(false);

  const handleClose = (event, reason) => {
    if (reason && reason === "backdropClick" && open.backdropClickDisabled)
        return;
    setOpen(false);
}

  const style = {
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: open.width?open.width:300,
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                };
  return (
    <div>
      <Modal
        keepMounted
        open={(open)?true:false}
        onClose={handleClose}
        aria-labelledby="keep-mounted-modal-title"
        aria-describedby="keep-mounted-modal-description"
      >
        <Box sx={style} className="modal-main">
          <Grid className="modal-content">
            {open.title?<Grid container direction="row" justifyContent="center" >
              <Grid className="modal-circle">
                <CampaignIcon sx={{ fontSize: 80, color:"white" }} />
              </Grid>
            </Grid>:false}
            {open.title?<>
                <Typography  variant="h5" component="h5" align={"center"}>
                  {open.title}
                </Typography>
            </>:false}
            {open.message?<>
              <Grid className="pr-2 pl-2 text-center">
                {open.message}
              </Grid>
            </>:false}
            <Box sx={{mt:3}}>{open.footer_btn?<>
              <Button fullWidth
              variant="outlined" 
              sx={{ mt: 10, mb: 2 }} onClick={()=>open.footer_btn.funct()}>
                {open.footer_btn.label}
              </Button>
            </>:<></>}</Box>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
