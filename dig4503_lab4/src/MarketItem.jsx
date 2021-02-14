import React from "react";

const MarketItem = (props) => {
  const { count } = props;
  return (
    <div>
      <p>Item{count}</p>
    </div>
  );
};

export class Market extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      items: [],
    };
  }

  render() {
    const { items } = this.state;

    const onClick = () => {
      const currentItemsCount = items.length;

      const newItem = (
        <MarketItem count={currentItemsCount} key={currentItemsCount} />
      );

      this.setState({
        items: [...items, newItem],
      });
    };

    return (
      <div>
        <button onClick={onClick}>Click me!</button>
        {items.map((item) => item)}
      </div>
    );
  }
}
