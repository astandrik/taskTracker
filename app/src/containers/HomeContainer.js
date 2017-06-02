import { connect } from 'react-redux';
import Home from "../components/Home.js";

const mapStateToProps = (state, ownProps) => {
  return {
    header: state.Home.header
  }
}

const HomeContainer = connect(
  mapStateToProps
)(Home)

export default HomeContainer;