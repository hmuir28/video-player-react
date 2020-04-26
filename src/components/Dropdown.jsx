import React, {
  Children,
  cloneElement,
  Fragment,
  useEffect,
} from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import M from "materialize-css";

const Dropdown = ({ children, className, trigger, options, ...props }) => {
  useEffect(() => {
    const instance = M.Dropdown.init(
      document.querySelector(`[data-target="${props.id}"]`),
      options
    );

    return () => {
      instance && instance.destroy();
    };
  }, [options, props.id]);

  const renderTrigger = () =>
    cloneElement(trigger, {
      'data-target': props.id,
      className: cx(trigger.props.className, 'dropdown-trigger')
    });

  const renderItems = () =>
    Children.map(children, (element, index) => {
      if (element.type.name === 'Divider') {
        return <li key={index} className="divider" tabIndex="-1" />;
      } else {
        return <li key={index}>{element}</li>;
      }
    });

  return (
    <Fragment>
      {renderTrigger()}
      <ul
        {...props}
        className={cx('dropdown-content', className)}
      >
        {renderItems()}
      </ul>
    </Fragment>
  );
};

Dropdown.propTypes = {
  id: PropTypes.string,
  /**
   * The node to trigger the dropdown
   */
  trigger: PropTypes.node.isRequired,
  children: PropTypes.node,
  className: PropTypes.string,
  options: PropTypes.shape({
    alignment: PropTypes.oneOf(['left', 'right']),
    autoTrigger: PropTypes.bool,
    constrainWidth: PropTypes.bool,
    container: PropTypes.node,
    coverTrigger: PropTypes.bool,
    closeOnClick: PropTypes.bool,
    hover: PropTypes.bool,
    inDuration: PropTypes.number,
    outDuration: PropTypes.number,
    onOpenStart: PropTypes.func,
    onOpenEnd: PropTypes.func,
    onCloseStart: PropTypes.func,
    onCloseEnd: PropTypes.func
  })
};

Dropdown.defaultProps = {
  id: '',
  options: {
    alignment: 'left',
    autoTrigger: true,
    constrainWidth: true,
    container: null,
    coverTrigger: true,
    closeOnClick: true,
    hover: false,
    inDuration: 150,
    outDuration: 250,
    onOpenStart: null,
    onOpenEnd: null,
    onCloseStart: null,
    onCloseEnd: null
  }
};

export default Dropdown;
