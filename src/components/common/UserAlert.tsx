import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  CloseButton,
  Box,
  VStack,
  useTheme,
} from "@chakra-ui/react";
import { useEffect } from "react";
import { AlertItem } from "../providers/AlertProvider";

interface UserAlertProps {
  alerts: AlertItem[];
  onClose: (id: string) => void;
  autoCloseDuration?: number;
}

const UserAlert: React.FC<UserAlertProps> = ({
  alerts,
  onClose,
  autoCloseDuration = 5000,
}) => {
  const theme = useTheme();

  useEffect(() => {
    alerts.forEach((alert) => {
      const timer = setTimeout(() => {
        onClose(alert.id);
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    });
  }, [alerts, onClose, autoCloseDuration]);

  if (alerts.length === 0) return null;

  return (
    <Box
      position="fixed"
      bottom={4}
      right={4}
      zIndex={9999}
      maxWidth="400px"
      width="100%"
    >
      <VStack spacing={2} align="stretch">
        {alerts.map((alert) => (
          <Alert
            key={alert.id}
            status={alert.type}
            borderRadius={"20px"}
            border={"3px solid"}
            boxShadow={"4px 4px 0px 0px black"}
            backgroundColor={theme.colors.custom.themeColor["gray"]}
          >
            <AlertIcon />
            <Box flex="1">
              <AlertTitle mr={2}>{alert.type.toUpperCase()}</AlertTitle>
              <AlertDescription>{alert.message}</AlertDescription>
            </Box>
            <CloseButton
              position="absolute"
              right={2}
              top={2}
              onClick={() => onClose(alert.id)}
            />
          </Alert>
        ))}
      </VStack>
    </Box>
  );
};

export default UserAlert;
