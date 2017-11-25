import React, {Component} from 'react';
import MaterialCard, {CardActions, CardContent, CardHeader} from 'material-ui/Card';

export default class Card extends Component {
  static propTypes = {};

  static defaultProps = {};

  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    const {
      children,
      title,
      subheader,
      actions,
      ...props,
    } = this.props;

    return (
      <MaterialCard {...props}>
        {!!title || !! subheader ? <CardHeader
          title={ title }
          subheader={subheader}

        /> : null}

        <CardContent>
          {children}
        </CardContent>

        {!!actions ? <CardActions>{actions}</CardActions> : null}
      </MaterialCard>
    );
  }
}