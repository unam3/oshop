const React = require("react"),
    ReactDOM = require("react-dom"),
    products = require('../products.js'),
    BlueButton = require('../blueButton.js');

function Quantity(props) {
  return <div className="product__element">
      <img />
      <input className="quantity"
        onChange={(e) => {
          e.preventDefault();
          props.onQuantityChange(props.productId, parseInt(e.target.value));
        }}
        type="number" min="1" defaultValue="1" />
      <img />
    </div>;
}

function DeleteOrderProduct(props) {
  return <a href="#" className="product__delete-product-button product__element blue-text link-wo-underline"
    onClick={(e) => {e.preventDefault(); props.f(props.productId);}}>Убрать</a>
}

function OrderProducts(props) {
  return <div className="order-products flex-column flex-children">
    {props.orderProducts.map((product) => product ? (<div className="product order-products__product padded" key={product.id}>
      <img className="product__preview product__element order-product-product-preview" />
      <a href="#" className="product__name-link product__element blue-text">{product.brand} {product.name}</a>
      <div className="product__cost product__element order-product-cost">{product.cost} руб.</div>
      <Quantity onQuantityChange={props.onQuantityChange} productId={product.id} />
      <DeleteOrderProduct f={props.deleteFromOrder} productId={product.id} />
    </div>) : null)}
  </div>;
}

function TotalCost(props) {
  //const totalCost = props.orderProducts.reduce((totalCost, product) => totalCost
  //  + product.cost, 0);
  return <div className="total-cost">Итого: {props.cost} руб.</div>;
}

function Form(props) {
  const order = function (args) {
    console.log("оформили");
  };
  return <form className="order-form flex-column">
      <input name="name" placeholder="Ваше имя" required />
      <input name="email" placeholder="Email" required />
      <input name="phone_number" placeholder="Телефон" required />
      <input name="adress" placeholder="Адрес доставки" required />
      <textarea className="comment-ta" name="comment" placeholder="Комментарий" required />
      <BlueButton text="Оформить заказ" additionalClasses="do-order"
        fobj={{f: order}} />
    </form>;
}

class Order extends React.Component {
  constructor (props) {
    super(props);

    this.state = {
      orderProducts: this.props.orderProducts,
      //get productId_quantity() {
      //  var products = this.orderProducts,
      //      obj = {};
      //  products.forEach((l) => obj[l.id] = 1);
      //  return obj;
      //},
      totalCost: 0,
      //get totalCost() {
      //  var piq = this.productId_quantity,
      //    orderProducts = this.orderProducts,
      //    getProduct = function (id) {
      //      var i = 0,
      //          id;
      //      while (true) {
      //        if (orderProducts[i].id === id)
      //          return orderProducts[i];
      //        i += 1;
      //      }
      //    };
      //  return Object.keys(piq).reduce(
      //    (costSum, productId) =>
      //      costSum += piq[productId] * getProduct(productId).cost
      //    ,
      //    0
      //  )
      //}
    };

    this.deleteFromOrder = (productId) => {
      var orderProducts = JSON.parse(JSON.stringify(this.state.orderProducts));
      Object.keys(orderProducts).some(function (k) {
        if (orderProducts[k] && orderProducts[k].id === productId) {
          delete orderProducts[k];
          return true;
        }
      });
      this.setState(function (prevState) {
        return {"orderProducts": orderProducts};
      });
    };

    this.evaluateTotalCost = () => this.setState(
      (prevState) => {
        var piq = prevState.productId_quantity,
          products = prevState.orderProducts,
          getProduct = function (products, id) {
            var i = 0,
                id;
            if (!products.length)
              throw "shi~~";
            while (true) {
              if (products[i].id === id)
                return products[i];
              i += 1;
            }
          };
        //console.log(
        //  JSON.stringify(piq, false, 2),
        //  JSON.stringify(products, false, 2)
        //);
        return {
          totalCost: Object.keys(piq).reduce(
            (costSum, productId) => {
              console.log(costSum, piq[productId],
                getProduct(products, productId))
              return costSum + piq[productId] * getProduct(products, productId).cost;
            },
            0
          )
        };
      }
    )

    this.changeQuantity = (id, quantity) => this.setState(
      (prevState) => {
        console.log(id, quantity)
        var products = prevState.orderProducts,
            obj = JSON.parse(JSON.stringify(
              prevState.productId_quantity || {}
            ));
        products.some((product) => obj[id] = quantity);
        return {
          productId_quantity: obj
        };
      }
    )
    
    this.onQuantityChange = (id, quantity) => {
      this.changeQuantity(id, quantity);
      this.evaluateTotalCost();
    }
  }
  
  componentDidMount() {
    this.state.orderProducts.forEach(
      (product) => {
        this.changeQuantity(product.id, 1);
      }
    )
    this.evaluateTotalCost();
  }

  render () {
    return <div className="order flex-column">
        <h1 className="title">Оформление заказа</h1>
        <OrderProducts orderProducts={this.state.orderProducts}
          deleteFromOrder={this.deleteFromOrder}
          onQuantityChange={this.onQuantityChange}
          />
        <TotalCost cost={this.state.totalCost} />
        <Form />
      </div>;
  }
}

//ReactDOM.render(
//  <require("../cart.js") />,
//  document.getElementById("cart")
//)

var productsCategory = Object.keys(products)[0],
    productsList = products[productsCategory],
    orderProducts = productsList.slice(0, 3);

ReactDOM.render(
  <Order orderProducts={orderProducts} />,
  document.getElementById("main")
)
