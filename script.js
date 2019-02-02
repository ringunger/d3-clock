
    var width = 300;
    var height = 400;
    var radius = 120;
function drawCanvas(){
    var center_x = width / 2;
    var center_y = height / 2;

    var svg = d3.select("#svgcontainer").append("svg").attr("width", width).attr("height", height);
    var defs = svg.append("defs");
    var clock_bg = defs.append("radialGradient").attr("id", "clock-bg");
        clock_bg.append("stop").attr("offset", "0%").attr("stop-color", "#fff");
        clock_bg.append("stop").attr("offset", "100%").attr("stop-color", "#eee");
        var filter = defs.append("filter")
        .attr("id", "dropshadow");
  
      filter.append("feGaussianBlur")
        .attr("in", "SourceAlpha")
        .attr("stdDeviation", 3)
        .attr("result", "blur");
      filter.append("feOffset")
        .attr("in", "blur")
        .attr("dx", 1)
        .attr("dy", 1)
        .attr("result", "offsetBlur");
  
    var feMerge = filter.append("feMerge");
  
    feMerge.append("feMergeNode")
        .attr("in", "offsetBlur");
    feMerge.append("feMergeNode")
        .attr("in", "SourceGraphic");



    svg.append("circle").attr("cx", center_x).attr("cy", center_y).attr("r", radius)
        .attr("class", "clock-circle")
        .attr("stroke-width", 6).attr("stroke", "#eee").attr("fill", "url(#clock-bg)")
        .style("filter", "url(#dropshadow)");

    var angle = 0; var font_size = 16;
    for(var i = 0; i < 60; i++){
        var tick_l = 8;
        if(i % 5) {tick_l = 4;}
        svg.append("line")
        .attr("class", ((i % 5) == 0) ? "hour" : "minute" + " tick")
        .attr("x1", center_x)
        .attr("y1", (center_y - radius) + 1)
        .attr("x2", center_x)
        .attr("y2", (center_y - radius)  +  tick_l)
        .style("stroke", "black")
        .attr("transform", "rotate(" + i * 6 + "," + center_x + "," + center_y + ")");

        if(i % 5 == 0) {
            svg.append("text")
            .attr("class", "clock-text")
            .attr("x", (i >= 50 || i == 0) ? (center_x - (font_size / 2)) : (center_x -(font_size / 4)))
            .attr("y", (center_y - radius) +  font_size + tick_l + 2)
            .attr("transform", "rotate(" + i * 6 + "," + center_x + "," + center_y + ")")
            .attr("font-size", font_size + "px")
            .attr("color", "black")
            .text((i == 0) ? 12 : i / 5);
        }
    }

    svg.append("text").attr("class", "clock-logo").attr("x", center_x - 32).attr("y", center_y + (radius / 2))
                        .style("fill", "#ddd")
                        .text("RingleSoft");

    svg.append("line").attr("class", "arrow second")
    .attr("x1", center_x).attr("y1", center_y + 12)
    .attr("x2", center_x).attr("y2", ((center_y - radius) + (0.2 * radius)));

    svg.append("line").attr("class", "arrow minute")
    .attr("x1", center_x).attr("y1", center_y + 12)
    .attr("x2", center_x).attr("y2", ((center_y - radius) + (0.3 * radius)));

    svg.append("line").attr("class", "arrow hour")
    .attr("x1", center_x).attr("y1", center_y + 12)
    .attr("x2", center_x).attr("y2", ((center_y - radius) + (0.45 * radius)));

    svg.append("circle").attr("cx", center_x).attr("cy", center_y).attr("r", 6)
        .style("fill", "white").style("stroke", "black").style("strokeWidth", 4);

    updateArrows();

    function updateArrows() {
        var angle = 0;
        var map = [];
        var cur_time = clockTime();
        svg.selectAll("line.arrow.second") //.transition().ease("elastic")
        .attr("transform", "rotate(" + (cur_time.second * 6) + "," + center_x + "," + center_y + ")");
        svg.selectAll("line.arrow.minute") // .transition().ease("bounce")
        .attr("transform", "rotate(" + Math.round(cur_time.minute * 6) + "," + center_x + "," + center_y + ")");
        svg.selectAll("line.arrow.hour") // .transition().ease("bounce")
        .attr("transform", "rotate(" + Math.round((cur_time.hour % 12) * 30) + "," + center_x + "," + center_y + ")");
    }

   function clockTime() {
        var now = new Date();
        var hr = now.getHours();
        var min = now.getMinutes();
        var sec = now.getSeconds();
        return {"hour":   hr + (min / 60) + (sec / 3600) ,
                "minute": min + (sec / 60) ,
                "second": sec 
                };
      }

      setInterval(updateArrows, 1000);
}