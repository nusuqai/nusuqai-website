import { ChatModal } from "@/components/Home/Demo/ChatModal";
import { sendChatMessage } from "@/app/actions/chat";

interface ChatModalWrapperProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ChatModalWrapper({
  isOpen,
  onClose,
}: ChatModalWrapperProps) {
  return (
    <ChatModal
      isOpen={isOpen}
      onClose={onClose}
      sendChatMessage={sendChatMessage}
    />
  );
}
