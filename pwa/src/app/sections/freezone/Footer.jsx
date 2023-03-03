import Grid from '@mui/material/Grid';
import image from '../../../assets/images/logoWhite.png';
import Typography from '@mui/material/Typography';
import EmailIcon from '@mui/icons-material/Email';
import SocialNetworks from '../../../components/SocialNetworks';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';

const App=()=>{
  return    <footer>
              <Grid container justifyContent="center" direction="row">
                <Grid item xs={6} md={2} align="center">
                  <img src={image} className="img-fluid"/>
                </Grid>
              </Grid>
              <Grid container justifyContent="center" direction="row" sx={{mt:2}}>
                <Grid item xs={12} md={3} align="center">
                  <Typography component="div" className="text-white">
                    <SocialNetworks/>
                    <Grid>Síguenos en nuestras redes</Grid>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3} align="center">
                  <Typography component="div" className="text-white">
                    <EmailIcon sx={{mr:1,fontSize:24,mb:1}}/>
                    <Grid>
                      info@programandoweb.net
                    </Grid>
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3} align="center">
                  <Typography  component="div" className="text-white">
                    <Grid align="center">
                      <WhatsAppIcon sx={{fontSize:24,mb:1}}/>
                    </Grid>
                    <Grid align="center">
                      3115000926
                    </Grid>
                  </Typography>
                </Grid>
                <Grid className="border-long"></Grid>
              </Grid>
              <Grid container justifyContent="center" direction="row" sx={{mt:2}}>
                <Grid item xs={12} md={10} align="center">
                  <Typography component="div" className="text-white" sx={{fontSize:12}}>
                    <Grid>
                      Dirección de notificación electrónica: contacto@colchonesimperio.com | NIT: 000.000.000-9 | Dirección: Calle 44 #55-00 Pereira - Colombia
                    </Grid>
                    <Grid>
                      Tu información de pago se procesa de forma segura. No almacenamos los detalles de la tarjeta de crédito ni tenemos acceso a la información de tu tarjeta de crédito.
                    </Grid>
                  </Typography>
                </Grid>
              </Grid>
            </footer>
}
export default App
