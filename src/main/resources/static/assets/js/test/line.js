var columnbool = 0; //�꾩옱 而щ읆 異붽� �щ�
                    var rowcounts = 2;
                    //var columncounts = 2;
                    var selectedbool = 0; //�꾩옱 踰꾪듉�� �섎굹�쇰룄 �좏깮�섏뿀�붿� �щ� ��:1 遺�:0
                    var previndex = "_";

                    function addRow(){
                        if(rowcounts < 10){
                            rowcounts++;
                            var html = "";
                            html += '<div id="row' + rowcounts + '"><button id="1_' + rowcounts + '" row="' + rowcounts + '" column="1" class="dot" onclick="clickbtn(this)"></button></div>';
                            $("#column1").append(html);

                            html = "";
                            html += '<div id="row' + rowcounts + '"><button id="2_' + rowcounts + '" row="' + rowcounts + '" column="2" class="dot" onclick="clickbtn(this)"></button></div>';
                            $("#column2").append(html);

                            html = "";
                            html += '<div id="row' + rowcounts + '"><button id="3_' + rowcounts + '" row="' + rowcounts + '" column="3" class="dot" onclick="clickbtn(this)"></button></div>';
                            $("#column3").append(html);

                            html = "";
                            html += '<div id="row' + rowcounts + '"><button id="4_' + rowcounts + '" row="' + rowcounts + '" column="4" class="dot" onclick="clickbtn(this)"></button></div>';
                            $("#column4").append(html);
                        }
                    }
                    function removeRow(){
                        if(rowcounts > 2){
                           
                            var linkobjindex = $("#column1").find("#row"+rowcounts).find("button").attr("link_num");
                            console.log("1 - " + linkobjindex);
                            if($("#" + linkobjindex).length != 0){
                                console.log("1");
                                $("#" + linkobjindex).removeClass("finished");

                                var linenum = $("#" + linkobjindex).attr("line_num");
                                $("#" + linkobjindex).attr("line_num", "");
                                $("#"+ linenum).remove();
                            }
                             $("#column1").find("#row"+rowcounts).remove();
                             
                            linkobjindex = $("#column2").find("#row"+rowcounts).find("button").attr("link_num");
                            console.log("2 - " + linkobjindex);
                            if($("#" + linkobjindex).length != 0){
                                console.log("2");
                                $("#" + linkobjindex).removeClass("finished");
                                var linenum = $("#" + linkobjindex).attr("line_num");
                                $("#" + linkobjindex).attr("line_num", "");
                                $("#"+ linenum).remove();
                            }
                            $("#column2").find("#row"+rowcounts).remove();
                            
                            linkobjindex = $("#column3").find("#row"+rowcounts).find("button").attr("link_num");
                            console.log("3 - " + linkobjindex);
                            if($("#" + linkobjindex).length != 0){
                                console.log("3");
                                $("#" + linkobjindex).removeClass("finished");
                                var linenum = $("#" + linkobjindex).attr("line_num");
                                $("#" + linkobjindex).attr("line_num", "");
                                $("#"+ linenum).remove();
                            }
                            $("#column3").find("#row"+rowcounts).remove();
                            
                            linkobjindex = $("#column4").find("#row"+rowcounts).find("button").attr("link_num");
                            console.log("4 - " + linkobjindex);
                            if($("#" + linkobjindex).length != 0){
                                console.log("4");
                                $("#" + linkobjindex).removeClass("finished");
                                var linenum = $("#" + linkobjindex).attr("line_num");
                                $("#" + linkobjindex).attr("line_num", "");
                                $("#"+ linenum).remove();
                            }
                            $("#column4").find("#row"+rowcounts).remove();
                            rowcounts--;
                        }
                    }
                    var lineIndex = 0;
                        function clickbtn(obj){
                            
                            if($(obj).hasClass("selected") ){
                                $(obj).removeClass("selected");
                                previndex = "_";
                                selectedbool = 0;
                            }else if($(obj).hasClass("finished") ){
                                $(obj).removeClass("finished");
                                var linkindex = $(obj).attr("link_num");
                                $("#" + linkindex).removeClass("finished");
                                // �� �쒓굅 異붽�

                                var linenum= $(obj).attr("line_num");
                                $(obj).attr("line_num", "");
                                $("#" + linkindex).attr("line_num", "");
                                $("#"+ linenum).remove();

                            }else{
                                if(selectedbool == 0){
                                    console.log("fy " + $(obj).position().top);
                                    console.log("fx " + $(obj).position().left);
                                        var curcolumn = $(obj).attr("column");
                                         var prevcolumn = 0;
                                         console.log("curcolumn " + curcolumn);
                                         console.log("previndex " + previndex);
                                         if(previndex.includes("_")){
                                              prevcolumn =  previndex.split("_")[0];                                            
                                         }

                                        if(curcolumn == prevcolumn){

                                        }else{
                                            $(obj).addClass("selected");
                                        }
                                        previndex = $(obj).attr("id");
                                        selectedbool = 1;
                                }else if(selectedbool == 1){
                                    var matchOkBool = 0;
                                    var prevcolumn = previndex.split("_")[0];
                                    var curcolumn = $(obj).attr("column");
                                    var rightbool = 0;
                                    if(prevcolumn == 1 || prevcolumn == 2){
                                        if(curcolumn == 1 || curcolumn == 2){
                                            matchOkBool = 1;
                                        }
                                    }
                                    if(prevcolumn == 3 || prevcolumn == 4){
                                       if(curcolumn == 3 || curcolumn == 4){
                                            matchOkBool = 1;
                                        }
                                        rightbool = 1;
                                    }
                                    if(curcolumn == prevcolumn){
                                        // 媛숈� 而щ읆 �좏깮
                                    }else{
                                        if(matchOkBool == 1){
                                            // �ш린 遺��� �좎뿰寃�(jointer)
                                            var curid = $(obj).attr("id");
                                            var curparent = $("#" + curid).parent();
                                            var prevparent = $("#" + previndex).parent();
                                            console.log("sy1 " + $(obj).position().top);
                                            console.log("sx1 " + $(obj).position().left);
                                            console.log("sy2 " + $("#" + previndex).position().top);
                                            console.log("sx2 " + $("#" + previndex).position().left);
                                            var y1 = $(obj).position().top;
                                            var x1 = $(obj).position().left;
                                            var y2 = $("#" + previndex).position().top;
                                            var x2 = $("#" + previndex).position().left;
                                            lineIndex++;
                                            var html = '';
                                            if(rightbool == 1){
                                                html = '<svg class="rightcolumn" id="'+lineIndex+'" style="position:absolute;z-index:999!important;"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:rgb(0,0,0);stroke-width:2" /></svg>'
                                            }else{
                                                html = '<svg id="'+lineIndex+'" style="position:absolute;z-index:999!important;"><line x1="' + x1 + '" y1="' + y1 + '" x2="' + x2 + '" y2="' + y2 + '" style="stroke:rgb(0,0,0);stroke-width:2" /></svg>'
                                            }
                                            if(rightbool == 1){
                                                $("#rightarea").prepend(html);
                                            }else{
                                                $("#leftarea").prepend(html);
                                            }
                                            
                                            
                                            //$(".form-joining").prepend(html);

                                            $(obj).removeClass("selected");
                                            $("#" + previndex).removeClass("selected");
                                            $(obj).addClass("finished");
                                            $("#" + previndex).addClass("finished");

                                            $(obj).attr("link_num", previndex);
                                            $("#" + previndex).attr("link_num", $(obj).attr("id"));

                                            $(obj).attr("line_num", lineIndex);
                                            $("#" + previndex).attr("line_num", lineIndex);

                                            selectedbool = 0;
                                            previndex = "_";
                                            //CreateNewLine();
                                            var posx;
                                            var posy;
                                            var width;
                                            var height;
                                            if(x1 > x2){
                                               posx = x2; 
                                               width = x1 - x2;
                                            }else{
                                                posx = x1
                                                width = x2 - x1;
                                            }
                                            if(y1 > y2){
                                                posy = y2;
                                                height = y1 - y2;

                                            }else{
                                                posy = y1;
                                                height = y2 - y1;
                                            }
                                            if(height == 0){
                                                height = "5";
                                            }
                                            svgchange(posx, posy, width, height, lineIndex);
                                            CreateNewLine(posx, posy, width, height,lineIndex);
                                        }
                                    }
                                }
                            
                            }
                            console.log("selectedbool " + selectedbool);

                            console.log(x1, x2, y1, y2)
                        } 
                        function CreateNewLine(posx, posy, width, height, lineIndex){
                            /*var width = $("#row1").width();
                            var height = $("#column1").height();*/
                            console.log("width " + width);
                            console.log("height " + height);

                            $("#" + lineIndex).css("width", width);
                            $("#" + lineIndex).css("height", height);
                           
                            $("#" + lineIndex).css("top", posy + "px");
                            $("#" + lineIndex).css("left", posx + "px");
                            if(height == "5"){
                                setTimeout(function(){
                                    $("#" + lineIndex).css("height", "10px");
                                    $("#" + lineIndex).css("margin-top", "2.5px");
                               }, 100);
                            }
                        }
                 function svgchange(posx, posy, width, height, lineIndex){
                   const svg = $("#" + lineIndex);
                  
                 const viewbox = posx + ' ' + posy + ' ' + width + ' ' + height;

                 $("#" + lineIndex).attr('viewBox', viewbox);
                 }

                    function columnEdit(k){
                        if(k == 1){
                            $("#column3").css("display", "block");
                            $("#column4").css("display", "block");
                            $("#column1").css("width", "150px");
                            //$("#columnaddbtn").css("background-color", "red");
                            //$("#columnaddbtn").text("�몃줈 �쒓굅");
                            var list = $(".rightcolumn").get();
                            for(var i = 0; i < list.length;i++){
                                $(list[i]).css("display", "block");
                            }
                            var list2 = $(".leftarea").find('svg').get();
                            for(var i = 0; i < list2.length;i++){
                                $(list2[i]).css("width", "150px");
                            }
                            columnbool = 1;
                        }else{
                            $("#column3").css("display", "none");
                            $("#column4").css("display", "none");
                            $("#column1").css("width", "150px");
                            //$("#columnaddbtn").css("background-color", "#289bff");
                            //$("#columnaddbtn").text("�몃줈 異붽�");
                            var list = $(".rightcolumn").get();
                            for(var i = 0; i < list.length;i++){
                                $(list[i]).css("display", "none");
                            }
                            var list2 = $(".leftarea").find('svg').get();
                            for(var i = 0; i < list2.length;i++){
                                $(list2[i]).css("width", "150px");
                            }
                            columnbool = 0;
                        }              
                    }
                    function ConnectInit(){

                    columnbool = 0; //�꾩옱 而щ읆 異붽� �щ�
                    rowcounts = 2;
                    //var columncounts = 2;
                    selectedbool = 0; //�꾩옱 踰꾪듉�� �섎굹�쇰룄 �좏깮�섏뿀�붿� �щ� ��:1 遺�:0
                    previndex = "_";
                            $(".form-joining").find("#column3").css("display", "none");
                            $(".form-joining").find("#column4").css("display", "none");
                            $("#columnaddbtn").css("background-color", "#289bff");
                            $("#columnaddbtn").text("�몃줈 異붽�");
                            /*var list = $(".rightcolumn").get();
                            for(var i = 0; i < list.length;i++){
                                $(list[i]).css("display", "none");
                            }*/
                        var html = "";
                        
                        html +=    '<span id="leftarea"></span>'
                        html +=    '<span id="rightarea"></span>'
                        html +=        '<div id="column1" style="width:150px;z-index:9999;">'
                        html +=            '<div id="row1"><button id="1_1" row="1" column="1" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=            '<div id="row2"><button id="1_2" row="2" column="1" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=        '</div>'
                        html +=        '<div id="line"></div>'
                        html +=        '<div id="column2" style="width:20px;z-index:9999;">'
                        html +=            '<div id="row1"><button id="2_1" row="1" column="2" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=            '<div id="row2"><button id="2_2" row="2" column="2" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=        '</div>'
                        html +=        '<div id="column3" style="width:150px;display:none;z-index:9999;">'
                        html +=            '<div id="row1"><button id="3_1" row="1" column="3" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=            '<div id="row2"><button id="3_2" row="2" column="3" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=        '</div>'
                        html +=        '<div id="column4" style="width:20px;display:none;z-index:9999;">'
                        html +=            '<div id="row1"><button id="4_1" row="1" column="4" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=            '<div id="row2"><button id="4_2" row="2" column="4" class="dot" onclick="clickbtn(this)"></button></div>'
                        html +=        '</div>'
                        console.log("clear");
                        $(".form-joining").empty();
                        $(".form-joining").html(html);
                    }
                    function ResultRemove(){
                        $("#leftLine").remove();
                        $("#rightLine").remove();
                    }
                    function finished(){
                        if(columnbool == 1){
                            $("#leftLine").remove();
                            $("#rightLine").remove();
                            //left
                            var c1 = '<div id="column1" style="width:150px;z-index:9999;">' + $("#column1").html() + '</div>';
                            var c2 = '<div id="column2" style="width:150px;z-index:9999;width:20px">' + $("#column2").html()+ '</div>';
                            var c3 = '<div id="column3" style="width:150px;z-index:9999;">' + $("#column3").html()+ '</div>';
                            var c4 = '<div id="column4" style="width:150px;z-index:9999;width:20px">' + $("#column4").html()+ '</div>';

                            var left = '<span id="leftarea">' + $("#leftarea").html() + '</span>';
                            var right = '<span id="rightarea">' + $("#rightarea").html() + '</span>';
                            
                            var html1= "<div id='leftLine' style='position:absolute;border:dotted 2px;cursor:move;display:flex;'><img src='https://cdn-icons-png.flaticon.com/512/458/458594.png' style='top:-10px;right:-10px;width:15px;height:15px;position:absolute;cursor:pointer;' onclick='removeText(this)'>";
                            html1 = html1 + left + c1 + c2;
                            html1 += "</div>"
                            
                            var html2= "<div id='rightLine' style='position:absolute;border:dotted 2px;cursor:move;display:flex;'><img src='https://cdn-icons-png.flaticon.com/512/458/458594.png' style='top:-10px;right:-10px;width:15px;height:15px;position:absolute;cursor:pointer;' onclick='removeText(this)'>";
                            html2 = html2 + right + c3 + c4;
                            html2 += "</div>"
                            $(".editor-box").append(html1);
                            $(".editor-box").append(html2);
                            
                            $("#leftLine").draggable();
                            $("#leftLine").css("top", Math.max(0, (($(window).height() - $("#leftLine").outerHeight()) / 2) + $(window).scrollTop() - 100) + 
                                "px");
                            $("#leftLine").css("left", Math.max(0, (($(window).width() - $("#leftLine").outerWidth()) / 2) + $(window).scrollLeft()) -100 + "px");

                            $("#rightLine").draggable();
                            $("#rightLine").css("top", Math.max(0, (($(window).height() - $("#rightLine").outerHeight()) / 2) + $(window).scrollTop() - 100) + 
                                "px");
                            $("#rightLine").css("left", Math.max(0, (($(window).width() - $("#rightLine").outerWidth()) / 2) + $(window).scrollLeft()) + 100 + "px");

                            var list2 = $("#leftLine").find("button").get();
                            var list3 = $("#rightLine").find("button").get();
                            var list4 = $("#rightLine").find("svg").get();

                            for(var i = 0; i < list2.length;i++){
                                $(list2[i]).attr("onclick", "");
                            }
                            for(var i = 0; i < list3.length;i++){
                                $(list3[i]).attr("onclick", "");
                            }
                            for(var i = 0; i < list4.length;i++){
                                $(list4[i]).css("left", "0px");
                            }
                        } else{
                            var list = $(".rightcolumn").get();
                            for(var i = 0; i < list.length;i++){
                                $(list[i]).remove();
                            }
                            $("#column3").remove();
                            $("#column4").remove();
                            $("#leftLine").remove();
                            $("#rightLine").remove();
                            var html = "<div id='leftLine' style='position:absolute;border:dotted 2px;cursor:move;display:flex;'><img src='https://cdn-icons-png.flaticon.com/512/458/458594.png' style='top:-10px;right:-10px;width:15px;height:15px;position:absolute;cursor:pointer;' onclick='removeText(this)'>";
                            html += $(".form-joining").html();
                            html += "</div>"
                            $(".editor-box").append(html);
                            
                            $("#leftLine").draggable();
                            $("#leftLine").css("top", Math.max(0, (($(window).height() - $("#leftLine").outerHeight()) / 2) + $(window).scrollTop() - 100) + "px");
                            $("#leftLine").css("left", Math.max(0, (($(window).width() - $("#leftLine").outerWidth()) / 2) + $(window).scrollLeft()) + "px");
                            var list2 = $("#leftLine").find("button").get();
                            
                            for(var i = 0; i < list2.length;i++){
                                $(list2[i]).attr("onclick", "");
                            }
                        }
                        ConnectInit();
                    }
                function removeText(obj){
        $(obj).parent().remove();
    }