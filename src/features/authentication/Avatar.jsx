import { useNavigate } from "react-router-dom";
import { HiOutlineUserCircle as AvatarIcon } from "react-icons/hi2";
import styled from "styled-components";

import useUser from "./useUser";
import Button from "../../ui/Button";

// Component: Avatar
const Avatar = () => {
  const navigate = useNavigate();
  const { user } = useUser();
  const { full_name, avatar } = user.user_metadata;

  return (
    <Button iconOnly onClick={() => navigate("/account")}>
      {avatar ? (
        <AvatarImg src={avatar} alt={`Avatar of ${full_name}`} />
      ) : (
        <AvatarIcon />
      )}
    </Button>
  );
};

// Styled component for Avatar image
const AvatarImg = styled.img`
  display: block;
  width: 1.75rem;
  aspect-ratio: 1;
  object-fit: cover;
  object-position: center;
  border-radius: 50%;
`;

export default Avatar;
