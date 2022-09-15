import './style.scss';

const Button = ({ icon, onClick }) => (
    <img className="button" src={icon} onClick={()=>onClick()} alt={"button"} /> 
);

export default Button;
