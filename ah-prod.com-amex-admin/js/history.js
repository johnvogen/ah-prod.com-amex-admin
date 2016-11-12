$("#myDropdownHistory").on("change", function () {


    //var e = $("myDropdownHistory");
    var e = this;
    var historyValue = $('#myDropdownHistory :selected').val();
    
    alert(historyValue);

    //repository.listChangesets().each(function () {
    //    console.log("Found changeset: " + this.getId());
    //});

    //try {
    //    repository.readChangeset("858:e4c90bcb2dcf09a98ec5").then(function () {
    //        console.log("Found node: " + this.get("title"));
    //    });
    //}
    //catch (e) {
    //    alert("my error:" + e);

    //}

    //var t = branch.readNode("633:e08c3eb549ea615f9250");
    //alert(t._doc);
    alert(branch.tip);


});

