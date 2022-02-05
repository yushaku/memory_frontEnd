import { makeStyles } from "@material-ui/core/styles";

export default makeStyles({
   media: {
      height: 0,
      paddingTop: "56.25%",
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      backgroundBlendMode: "darken",
   },
   border: {
      border: "solid",
   },
   fullHeightCard: {
      height: "100%",
   },
   card: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      borderRadius: "15px",
      height: "300px",
      position: "relative",
   },
   overlay: {
      position: "absolute",
      top: "20px",
      left: "20px",
      color: "white",
   },
   overlay2: {
      position: "absolute",
      top: "20px",
      right: "20px",
      color: "white",
   },
   grid: {
      display: "flex",
   },
   details: {
      display: "flex",
      justifyContent: "space-between",
      margin: "2px 8px 8px 8px",
      fontSize:'8px'

   },
   title: {
      padding: "0 8px",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "block",
      textOverflow: "ellipsis",
      fontSize: '23px',
   },
   message: {
      overflow: "hidden",
      textOverflow: "ellipsis",
      wordWrap: 'break-word',
      display: 'block',
      maxHeight: '3.5em', 
      lineHeight: '1.8em',
      padding: '8px'
   },
   cardActions: {
      padding: "0 8px 8px 8px",
      display: "flex",
      justifyContent: "space-between",
   },
   cardAction: {
      display: "block",
      textAlign: "initial",
   },
   CardMedia:{
      height:'120px'
   },
});
