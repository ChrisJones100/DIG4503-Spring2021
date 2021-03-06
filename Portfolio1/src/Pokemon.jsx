import './Pokemon.css'

const Pokemon = ({ name, imageUri }) => {
  return (
    <div
      // TODO: turn these into CSS classes
      // className=''
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginBottom: 25,
      }}
    >
      <div>{name}</div>
      <img src={imageUri} />
    </div>
  );
};
export default Pokemon;
