import PropTypes from 'prop-types';
import './SingleCard.css'

function SingleCard({ card, handleChoice, flipped, disabled }) {

  const handleClick = () => {
    if (!disabled) {
      handleChoice(card);
    }
  }

  return (
    <div className="card">
      <div className={flipped ? "flipped" : ""}>
        <img className="front" src={card.src} alt="card front" />
        <img
          className="back"
          src="/assets/back.jpg"
          onClick={handleClick}
          alt="card back"
        />
      </div>
    </div>
  );
}

SingleCard.propTypes = {
  card: PropTypes.shape({
    src: PropTypes.string.isRequired,
  }).isRequired,
  handleChoice: PropTypes.func.isRequired,
  flipped: PropTypes.bool.isRequired,
  disabled: PropTypes.bool.isRequired,
};

export default SingleCard;