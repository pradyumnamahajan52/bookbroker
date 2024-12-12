import React from "react";

const FloatingBar = () => {
  return (
    //   <!-- FLOATING BAR-->
    <div id="myBtnContainer" class="floating-options">
      <div class="floating-option-item">
        <button class="btnn active" onclick="filterSelection('all')">
          {" "}
          Show all
        </button>
      </div>
      {/* {% for psc in products_subcategory %}
        <div class="floating-option-item">
            <button class="btnn" onclick="filterSelection('{{psc.subcategory_name}}')">{{psc.subcategory_name}}</button>
        </div>
        {% endfor %} */}
    </div>
  );
};

export default FloatingBar;
