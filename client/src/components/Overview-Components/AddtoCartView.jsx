/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable react/prop-types */
/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useState, useEffect } from 'react';
import _ from 'underscore';
import { BsStar } from 'react-icons/bs';

function AddtoCartView({ selectedStyle }) {
  const { skus } = selectedStyle;
  let renderSizes;
  let renderDefaultSizeOption;
  let renderQty;
  let renderDefaultQtyOption;

  // STATE DECLARATION
  const [validSkus, setValidSkus] = useState([]);
  const [selectedSize, setSelectedSize] = useState('DEFAULT');
  const [quantity, setQuantity] = useState(0);
  const [cartToggle, setCartToggle] = useState(false);

  // LIFECYCLE METHODS
  useEffect(() => {
    if (skus) {
      const validSkuList = [];
      _.each(skus, (sku, key) => {
        if (sku.quantity > 0) {
          validSkuList.push({ id: key, quantity: sku.quantity, size: sku.size });
        }
      });
      setValidSkus(validSkuList);
    }
  }, [selectedStyle]);

  useEffect(() => {
    if (skus) {
      _.each(skus, (sku) => {
        if (sku.size === selectedSize) {
          setQuantity(sku.quantity);
        }
      });
    }
  }, [selectedSize]);

  // CONDITIONAL RENDERS
  if (validSkus !== []) {
    renderDefaultSizeOption = <option value="DEFAULT">SELECT SIZE</option>;
    renderSizes = _.map(validSkus, (sku) => (
      <option key={sku.id} value={sku.size}>{sku.size}</option>
    ));
  } else {
    renderDefaultSizeOption = <option value="DEFAULT" disabled>OUT OF STOCK</option>;
  }

  if (quantity !== 0) {
    const max = quantity > 15 ? 15 : quantity;
    const qtyList = _.range(1, max + 1);
    renderQty = _.map(qtyList, (qty) => (
      qty === 1
        ? <option key={qty} selected="selected" value={qty}>{qty}</option>
        : <option key={qty} value={qty}>{qty}</option>
    ));
    renderDefaultQtyOption = <option value="-" disabled>-</option>;
  } else {
    renderDefaultQtyOption = <option value="DEFAULT" disabled>-</option>;
  }

  let selectSizeMessage = '';
  if (selectedSize === 'DEFAULT') {
    selectSizeMessage = 'Please select size';
  }

  // CLICK EVENT HANDLERS
  function handleSizeSelect(e) {
    setSelectedSize(e.target.value);
    const x = document.getElementById('sizeSelect');
    x.size = 1;
  }

  function handleAddCart() {
    if (selectedSize === 'DEFAULT') {
      setCartToggle(!cartToggle);
      const x = document.getElementById('sizeSelect');
      x.size = x.options.length;
    }
  }

  return (
    <div>
      {/* Select Size and Quantity */}
      <div className="row" id="sizeQtySelectors">
        <p className={cartToggle ? 'd-block' : 'd-none'}>
          {selectSizeMessage}
        </p>
        <div className="col-8">
          <div className="input-group mb-3">
            <select onChange={handleSizeSelect} id="sizeSelect" className="form-select w-100 p-3 border border-dark" defaultValue="DEFAULT">
              {/* <div className="dropdown"> */}
              {renderDefaultSizeOption}
              {/* <ul className="dropdown-menu" aria-labelledby="dropdownMenuButton1"> */}
              {renderSizes}
              {/* </ul> */}
              {/* </div> */}
            </select>
          </div>
        </div>
        <div className="col-4">
          <div className="input-group mb-3">
            <select className="form-select w-100 p-3 border border-dark" defaultValue="DEFAULT">
              {renderDefaultQtyOption}
              {renderQty}
            </select>
          </div>
        </div>
      </div>
      {/* Add to Cart and Favorite */}
      <div className="row">
        <div className={`col-10 ${validSkus === [] ? 'd-none' : ''}`}>
          <button onClick={handleAddCart} type="button" className="btn btn-outline-dark w-100 p-3">Add to Cart</button>
        </div>
        <div className="col-2">
          <button type="button" className="btn btn-outline-dark w-100 p-3"><BsStar /></button>
        </div>
      </div>
    </div>
  );
}

export default AddtoCartView;