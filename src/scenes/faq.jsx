import { Box, useTheme } from "@mui/material";
import Header from "../components/Header";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { tokens } from "../theme";

const FAQ = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px">
      <Header title="FAQ" subtitle="" />

      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What is Evidence Vault?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Evidence Vault is a decentralized application (dApp) designed to address unreported 
          criminal cases by allowing citizens to securely submit evidence anonymously.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How does Evidence Vault protect user anonymity?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Evidence Vault ensures user anonymity by not requiring any personal information during submission. Users can submit 
          evidence with only location details to protect their identity.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          How is evidence stored in Evidence Vault?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Evidence is stored using the InterPlanetary File System (IPFS), a decentralized storage protocol, ensuring 
          data integrity and availability while maintaining user privacy.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can I trust the security of my submitted evidence?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Yes, Evidence Vault employs encryption techniques and blockchain technology to secure all 
          submitted evidence, preventing unauthorized access or tampering.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          What types of evidence can be submitted?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          Evidence Vault accepts various types of evidence, including images and audio files, 
          relevant to criminal cases. We encourage users to submit any evidence they possess.
          </Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion sx={{ my: 2 }} >
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography color={colors.greenAccent[500]} variant="h5">
          Can I submit evidence of my roommate's infamous midnight snack raids?
          </Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>
          While we sympathize with your plight, Evidence Vault focuses on addressing serious criminal cases. However, if snack 
          theft becomes a felony, we'll be sure to set up a "Midnight Munchies Task Force"!
          </Typography>
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};

export default FAQ;
