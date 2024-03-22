const global_date_format = "DD M dd, yy";

function formatDate(date) {
  var d = new Date(date),
    month = "" + (d.getMonth() + 1),
    day = "" + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("");
}
const setup_parameters = {
  hotel_id: 3433, // required - your WebRezPro hotel id must be entered
  default_days_in_advance: 0, // optional - default is 0 days in advance,
  flag_turnoff_autoload_date: "1", // 0 = arrival and departure dates automatically loaded, 1 = not loaded, default is 0
};

jQuery(document).ready(function ($) {
  InitializeCalendars(setup_parameters.default_days_in_advance);

  function InitializeCalendars(default_days_in_advance) {
    var date = new Date();
    var date_from = new Date();
    date_from.setDate(date.getDate() + default_days_in_advance);
    var date_to = new Date();
    date_to.setDate(date_from.getDate() + 1);

    //if ($("#formatted_date_from").val() == 'Arrival date')
    $("#formatted_date_from").val(
      $.datepicker.formatDate(global_date_format, date_from)
    );

    //if ($("#formatted_date_to").val() == 'Departure date')
    $("#formatted_date_to").val(
      $.datepicker.formatDate(global_date_format, date_to)
    );

    if (setup_parameters == 1) {
      $("#date_from").val(formatDate(date_from));
      $("#date_to").val(formatDate(date_to));
    }

    var num_months = 1;
    Date.format = "yyyy-mm-dd";
    $(function () {
      $("#formatted_date_from").datepicker({
        dateFormat: global_date_format,
        numberOfMonths: num_months,
        beforeShowDay: DisableArrivalDays,
      });
    });
    $(function () {
      $("#formatted_date_to").datepicker({
        dateFormat: global_date_format,
        numberOfMonths: num_months,
        beforeShowDay: DisableArrivalDays,
      });
    });

    function DisableArrivalDays(date) {
      var date_today = new Date();
      var date_cutoff = new Date();
      date_cutoff.setDate(date_today.getDate() + default_days_in_advance - 1);

      if (date < date_cutoff) return [0];

      return [1];
    }

    $("#formatted_date_from").change(function () {
      var date_from = ConvertDateTextToDate($("#formatted_date_from").val());
      $("#date_from").val(
        ConvertDateTextToInteger($("#formatted_date_from").val())
      );

      var date_to = ConvertDateTextToDate($("#formatted_date_to").val());
      if (!date_from) return false;

      //alert('date from ' + date_from + ', dater to ' + date_to);

      if (date_to <= date_from) {
        var date_start = $("#formatted_date_from").datepicker("getDate");
        var date_new = new Date(Date.parse(date_start));
        date_new.setDate(date_new.getDate() + 1);
        var newDate = date_new.toDateString();
        newDate = new Date(Date.parse(newDate));
        $("#formatted_date_to").datepicker("setDate", newDate);
        var date_to = ConvertDateTextToInteger($("#formatted_date_to").val());
        $("#date_to").val(date_to);
      }

      return false;
    });

    $("#formatted_date_to").change(function () {
      var date_from = ConvertDateTextToDate($("#formatted_date_from").val());
      var date_to = ConvertDateTextToDate($("#formatted_date_to").val());

      if (date_to <= date_from) {
        var date_end = $("#formatted_date_to").datepicker("getDate");
        var date_new = new Date(Date.parse(date_end));
        date_new.setDate(date_new.getDate() - 1);
        var newDate = date_new.toDateString();
        newDate = new Date(Date.parse(newDate));
        $("#formatted_date_from").datepicker("setDate", newDate);

        var date_from = ConvertDateTextToInteger(
          $("#formatted_date_from").val()
        );
        $("#date_from").val(date_from);
      }

      var date_to = ConvertDateTextToInteger($("#formatted_date_to").val());
      $("#date_to").val(date_to);
      return false;
    });

    $("#search_button").click(function () {
      //var date_from = ConvertDateTextToInteger($("#formatted_date_from").val());
      //$("#date_from").val(date_from);

      //var date_to = ConvertDateTextToInteger($("#formatted_date_to").val());
      //$("#date_to").val(date_to);

      var url = "https://secure.webrez.com/Bookings105/activity-edit.html?";
      $("#widget_link").attr("action", url);
      //document.location.href = url;
      return false;
    });

    function ConvertDateTextToDate(date_text) {
      var date = $.datepicker.parseDate(global_date_format, date_text);
      if (isNaN(Date.parse(date))) return 0;
      //return  new Date();
      return date;
    }

    function ConvertDateTextToInteger(date_text) {
      var date = $.datepicker.parseDate(global_date_format, date_text);
      date = $.datepicker.formatDate("yymmdd", date);
      return date;
    }
  }
});
