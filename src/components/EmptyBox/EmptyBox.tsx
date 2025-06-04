import { useLanguage } from "@/context/LocaleProvider";
import { StyledText, StyledWrapper } from "./styles";
const EmptyBox = () => {
  const { feelingEmpty } = useLanguage();
  return (
    <StyledWrapper>
      <StyledText>{feelingEmpty}</StyledText>
    </StyledWrapper>
  );
};

export default EmptyBox;
