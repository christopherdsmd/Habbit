import React from "react";

const DateTime = () => {
  var showdate = new Date();
  var options = { 
    month: 'long',
    day: 'numeric',
    year: 'numeric',
    weekday: 'long', 
  };

  var displaytodaysdate = showdate.toLocaleDateString('en-US', options);
  var dt = showdate.toDateString();

  return (
    <div>
      <center>
        {displaytodaysdate}
      </center>
    </div>
  );
};

export default DateTime;
