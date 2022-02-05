import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
   media: {
      borderRadius: "20px",
      objectFit: "cover",

      width: "500px",
      maxHeight: "600px",
   },
   card: {
      display: "flex",
      width: "100%",
      borderRadius:'8px',
      [theme.breakpoints.down("sm")]: {
         flexWrap: "wrap",
         flexDirection: "column",
      },
   },
   section: {
      borderRadius: "20px",
      margin: "10px",
      flex: 1,
   },
   imageSection: {
      margin: "20px",
      [theme.breakpoints.down("sm")]: {
         marginLeft: 0,
      },
   },
   recommendedPosts: {
      display: "flex",
      [theme.breakpoints.down("sm")]: {
         flexDirection: "column",
      },
   },
   loadingPaper: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "20px",
      borderRadius: "15px",
      height: "39vh",
   },
   commentOuterContainer:{
      marginLeft: '8px',
      width:'100%'
   },
   commentTitle:{
      fontSize: '62px',
      width:'100%',
      textAlign:'center',
   },
   creator:{
      display:'flex',
      gap:'30%'
   },
   recommendCard:{
      border:'1px solid #999',
      padding:'8px',
      borderRadius:'8px'

   },
}));
