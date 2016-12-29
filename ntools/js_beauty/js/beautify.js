function js_beautify(Aa,U){var Af,H,o,A,Ag,Al,B,D,z,T;var p,c,Y,Ah,K,Ak;var L,E,G;var R,F,P;var J="";U=U?U:{};var q;if(U.space_after_anon_function!==undefined&&U.jslint_happy===undefined){U.jslint_happy=U.space_after_anon_function}if(U.braces_on_own_line!==undefined){q=U.braces_on_own_line?"expand":"collapse"}q=U.brace_style?U.brace_style:(q?q:"collapse");var k=U.indent_size?U.indent_size:4;var g=U.indent_char?U.indent_char:" ";var N=typeof U.preserve_newlines==="undefined"?true:U.preserve_newlines;var w=typeof U.max_preserve_newlines==="undefined"?false:U.max_preserve_newlines;var Ai=U.jslint_happy==="undefined"?false:U.jslint_happy;var I=typeof U.keep_array_indentation==="undefined"?false:U.keep_array_indentation;var s=typeof U.space_before_conditional==="undefined"?true:U.space_before_conditional;var n=typeof U.indent_case==="undefined"?false:U.indent_case;var m=typeof U.unescape_strings==="undefined"?false:U.unescape_strings;F=false;var V=Aa.length;function M(i){i=typeof i==="undefined"?false:i;while(H.length&&(H[H.length-1]===" "||H[H.length-1]===T||H[H.length-1]===J||(i&&(H[H.length-1]==="\n"||H[H.length-1]==="\r")))){H.pop()}}function v(i){return i.replace(/^\s\s*|\s\s*$/,"")}function u(j){j=j.replace(/\x0d/g,"");var i=[],t=j.indexOf("\n");while(t!==-1){i.push(j.substring(0,t));j=j.substring(t+1);t=j.indexOf("\n")}if(j.length){i.push(j)}return i}function W(){var i=I;I=false;Ab();I=i}function Ab(t){D.eat_next_space=false;if(I&&b(D.mode)){return}t=typeof t==="undefined"?true:t;D.if_line=false;M();if(!H.length){return}if(H[H.length-1]!=="\n"||!t){F=true;H.push("\n")}if(J){H.push(J)}for(var j=0;j<D.indentation_level;j+=1){H.push(T)}if(D.var_line&&D.var_line_reindented){H.push(T)}if(D.case_body){H.push(T)}}function h(){if(A==="TK_COMMENT"){return Ab()}if(D.eat_next_space){D.eat_next_space=false;return}var i=" ";if(H.length){i=H[H.length-1]}if(i!==" "&&i!=="\n"&&i!==T){H.push(" ")}}function a(){F=false;D.eat_next_space=false;H.push(o)}function x(){D.indentation_level+=1}function S(){if(H.length&&H[H.length-1]===T){H.pop()}}function Aj(i){if(D){z.push(D)}D={previous_mode:D?D.mode:"BLOCK",mode:i,var_line:false,var_line_tainted:false,var_line_reindented:false,in_html_comment:false,if_line:false,in_case_statement:false,in_case:false,case_body:false,eat_next_space:false,indentation_baseline:-1,indentation_level:(D?D.indentation_level+(D.case_body?1:0)+((D.var_line&&D.var_line_reindented)?1:0):0),ternary_depth:0}}function b(i){return i==="[EXPRESSION]"||i==="[INDENTED-EXPRESSION]"}function e(i){return Ae(i,["[EXPRESSION]","(EXPRESSION)","(FOR-EXPRESSION)","(COND-EXPRESSION)"])}function Ac(){G=D.mode==="DO_BLOCK";if(z.length>0){var i=D.mode;D=z.pop();D.previous_mode=i}}function l(Ao,j){for(var t=0;t<Ao.length;t++){var An=v(Ao[t]);if(An.charAt(0)!==j){return false}}return true}function Q(i){return Ae(i,["case","return","do","if","throw","else"])}function Ae(t,j){for(var An=0;An<j.length;An+=1){if(j[An]===t){return true}}return false}function Z(i){var j=Ah;var t=Af.charAt(j);while(Ae(t,p)&&t!==i){j++;if(j>=V){return 0}t=Af.charAt(j)}return t}function r(){var j;var Av;P=0;if(Ah>=V){return["","TK_EOF"]}R=false;var Ar=Af.charAt(Ah);Ah+=1;var Ap=I&&b(D.mode);if(Ap){var Au=0;while(Ae(Ar,p)){if(Ar==="\n"){M();H.push("\n");F=true;Au=0}else{if(Ar==="\t"){Au+=4}else{if(Ar==="\r"){}else{Au+=1}}}if(Ah>=V){return["","TK_EOF"]}Ar=Af.charAt(Ah);Ah+=1}if(D.indentation_baseline===-1){D.indentation_baseline=Au}if(F){for(j=0;j<D.indentation_level+1;j+=1){H.push(T)}if(D.indentation_baseline!==-1){for(j=0;j<Au-D.indentation_baseline;j++){H.push(" ")}}}}else{while(Ae(Ar,p)){if(Ar==="\n"){P+=((w)?(P<=w)?1:0:1)}if(Ah>=V){return["","TK_EOF"]}Ar=Af.charAt(Ah);Ah+=1}if(N){if(P>1){for(j=0;j<P;j+=1){Ab(j===0);F=true}}}R=P>0}if(Ae(Ar,c)){if(Ah<V){while(Ae(Af.charAt(Ah),c)){Ar+=Af.charAt(Ah);Ah+=1;if(Ah===V){break}}}if(Ah!==V&&Ar.match(/^[0-9]+[Ee]$/)&&(Af.charAt(Ah)==="-"||Af.charAt(Ah)==="+")){var Aq=Af.charAt(Ah);Ah+=1;var Aw=r();Ar+=Aq+Aw[0];return[Ar,"TK_WORD"]}if(Ar==="in"){return[Ar,"TK_OPERATOR"]}if(R&&A!=="TK_OPERATOR"&&A!=="TK_EQUALS"&&!D.if_line&&(N||Ag!=="var")){Ab()}return[Ar,"TK_WORD"]}if(Ar==="("||Ar==="["){return[Ar,"TK_START_EXPR"]}if(Ar===")"||Ar==="]"){return[Ar,"TK_END_EXPR"]}if(Ar==="{"){return[Ar,"TK_START_BLOCK"]}if(Ar==="}"){return[Ar,"TK_END_BLOCK"]}if(Ar===";"){return[Ar,"TK_SEMICOLON"]}if(Ar==="/"){var An="";var Ax=true;if(Af.charAt(Ah)==="*"){Ah+=1;if(Ah<V){while(Ah<V&&!(Af.charAt(Ah)==="*"&&Af.charAt(Ah+1)&&Af.charAt(Ah+1)==="/")){Ar=Af.charAt(Ah);An+=Ar;if(Ar==="\n"||Ar==="\r"){Ax=false}Ah+=1;if(Ah>=V){break}}}Ah+=2;if(Ax&&P===0){return["/*"+An+"*/","TK_INLINE_COMMENT"]}else{return["/*"+An+"*/","TK_BLOCK_COMMENT"]}}if(Af.charAt(Ah)==="/"){An=Ar;while(Af.charAt(Ah)!=="\r"&&Af.charAt(Ah)!=="\n"){An+=Af.charAt(Ah);Ah+=1;if(Ah>=V){break}}if(R){Ab()}return[An,"TK_COMMENT"]}}if(Ar==="'"||Ar==='"'||(Ar==="/"&&((A==="TK_WORD"&&Q(Ag))||(Ag===")"&&Ae(D.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"]))||(A==="TK_COMMA"||A==="TK_COMMENT"||A==="TK_START_EXPR"||A==="TK_START_BLOCK"||A==="TK_END_BLOCK"||A==="TK_OPERATOR"||A==="TK_EQUALS"||A==="TK_EOF"||A==="TK_SEMICOLON")))){var AA=Ar;var Ao=false;var Ay=0;var At=0;Av=Ar;if(Ah<V){if(AA==="/"){var Az=false;while(Ao||Az||Af.charAt(Ah)!==AA){Av+=Af.charAt(Ah);if(!Ao){Ao=Af.charAt(Ah)==="\\";if(Af.charAt(Ah)==="["){Az=true}else{if(Af.charAt(Ah)==="]"){Az=false}}}else{Ao=false}Ah+=1;if(Ah>=V){return[Av,"TK_STRING"]}}}else{while(Ao||Af.charAt(Ah)!==AA){Av+=Af.charAt(Ah);if(Ay&&Ay>=At){Ay=parseInt(Av.substr(-At),16);if(Ay&&Ay>=32&&Ay<=126){Ay=String.fromCharCode(Ay);Av=Av.substr(0,Av.length-At-2)+(((Ay===AA)||(Ay==="\\"))?"\\":"")+Ay}Ay=0}if(Ay){Ay++}else{if(!Ao){Ao=Af.charAt(Ah)==="\\"}else{Ao=false;if(m){if(Af.charAt(Ah)==="x"){Ay++;At=2}else{if(Af.charAt(Ah)==="u"){Ay++;At=4}}}}}Ah+=1;if(Ah>=V){return[Av,"TK_STRING"]}}}}Ah+=1;Av+=AA;if(AA==="/"){while(Ah<V&&Ae(Af.charAt(Ah),c)){Av+=Af.charAt(Ah);Ah+=1}}return[Av,"TK_STRING"]}if(Ar==="#"){if(H.length===0&&Af.charAt(Ah)==="!"){Av=Ar;while(Ah<V&&Ar!=="\n"){Ar=Af.charAt(Ah);Av+=Ar;Ah+=1}H.push(v(Av)+"\n");Ab();return r()}var As="#";if(Ah<V&&Ae(Af.charAt(Ah),Ak)){do{Ar=Af.charAt(Ah);As+=Ar;Ah+=1}while(Ah<V&&Ar!=="#"&&Ar!=="=");if(Ar==="#"){}else{if(Af.charAt(Ah)==="["&&Af.charAt(Ah+1)==="]"){As+="[]";Ah+=2}else{if(Af.charAt(Ah)==="{"&&Af.charAt(Ah+1)==="}"){As+="{}";Ah+=2}}}return[As,"TK_WORD"]}}if(Ar==="<"&&Af.substring(Ah-1,Ah+3)==="<!--"){Ah+=3;Ar="<!--";while(Af.charAt(Ah)!=="\n"&&Ah<V){Ar+=Af.charAt(Ah);Ah++}D.in_html_comment=true;return[Ar,"TK_COMMENT"]}if(Ar==="-"&&D.in_html_comment&&Af.substring(Ah-1,Ah+2)==="-->"){D.in_html_comment=false;Ah+=2;if(R){Ab()}return["-->","TK_COMMENT"]}if(Ae(Ar,Y)){while(Ah<V&&Ae(Ar+Af.charAt(Ah),Y)){Ar+=Af.charAt(Ah);Ah+=1;if(Ah>=V){break}}if(Ar===","){return[Ar,"TK_COMMA"]}else{if(Ar==="="){return[Ar,"TK_EQUALS"]}else{return[Ar,"TK_OPERATOR"]}}}return[Ar,"TK_UNKNOWN"]}T="";while(k>0){T+=g;k-=1}while(Aa&&(Aa.charAt(0)===" "||Aa.charAt(0)==="\t")){J+=Aa.charAt(0);Aa=Aa.substring(1)}Af=Aa;B="";A="TK_START_EXPR";Ag="";Al="";H=[];G=false;p="\n\r\t ".split("");c="abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_$".split("");Ak="0123456789".split("");Y="+ - * / % & ++ -- = += -= *= /= %= == === != !== > < >= <= >> << >>> >>>= >>= <<= && &= | || ! !! , : ? ^ ^= |= ::";Y+=" <%= <% %> <?= <? ?>";Y=Y.split(" ");K="continue,try,throw,return,var,if,switch,case,default,for,while,break,function".split(",");z=[];Aj("BLOCK");Ah=0;while(true){var C=r();o=C[0];E=C[1];if(E==="TK_EOF"){break}switch(E){case"TK_START_EXPR":if(o==="["){if(A==="TK_WORD"||Ag===")"){if(Ae(Ag,K)){h()}Aj("(EXPRESSION)");a();break}if(D.mode==="[EXPRESSION]"||D.mode==="[INDENTED-EXPRESSION]"){if(Al==="]"&&Ag===","){if(D.mode==="[EXPRESSION]"){D.mode="[INDENTED-EXPRESSION]";if(!I){x()}}Aj("[EXPRESSION]");if(!I){Ab()}}else{if(Ag==="["){if(D.mode==="[EXPRESSION]"){D.mode="[INDENTED-EXPRESSION]";if(!I){x()}}Aj("[EXPRESSION]");if(!I){Ab()}}else{Aj("[EXPRESSION]")}}}else{Aj("[EXPRESSION]")}}else{if(B==="for"){Aj("(FOR-EXPRESSION)")}else{if(Ae(B,["if","while"])){Aj("(COND-EXPRESSION)")}else{Aj("(EXPRESSION)")}}}if(Ag===";"||A==="TK_START_BLOCK"){Ab()}else{if(A==="TK_END_EXPR"||A==="TK_START_EXPR"||A==="TK_END_BLOCK"||Ag==="."){if(R){Ab()}}else{if(A!=="TK_WORD"&&A!=="TK_OPERATOR"){h()}else{if(B==="function"||B==="typeof"){if(Ai){h()}}else{if(Ae(Ag,K)||Ag==="catch"){if(s){h()}}}}}}a();break;case"TK_END_EXPR":if(o==="]"){if(I){if(Ag==="}"){S();a();Ac();break}}else{if(D.mode==="[INDENTED-EXPRESSION]"){if(Ag==="]"){Ac();Ab();a();break}}}}Ac();a();break;case"TK_START_BLOCK":if(B==="do"){Aj("DO_BLOCK")}else{Aj("BLOCK")}if(q==="expand"||q==="expand-strict"){var Am=false;if(q==="expand-strict"){Am=(Z()==="}");if(!Am){Ab(true)}}else{if(A!=="TK_OPERATOR"){if(Ag==="="||(Q(Ag)&&Ag!=="else")){h()}else{Ab(true)}}}a();if(!Am){x()}}else{if(A!=="TK_OPERATOR"&&A!=="TK_START_EXPR"){if(A==="TK_START_BLOCK"){Ab()}else{h()}}else{if(b(D.previous_mode)&&Ag===","){if(Al==="}"){h()}else{Ab()}}}x();a()}break;case"TK_END_BLOCK":Ac();if(q==="expand"||q==="expand-strict"){if(Ag!=="{"){Ab()}a()}else{if(A==="TK_START_BLOCK"){if(F){S()}else{M()}}else{if(b(D.mode)&&I){I=false;Ab();I=true}else{Ab()}}a()}break;case"TK_WORD":if(G){h();a();h();G=false;break}L="NONE";if(o==="function"){if(D.var_line&&A!=="TK_EQUALS"){D.var_line_reindented=true}if((F||Ag===";")&&Ag!=="{"&&A!=="TK_BLOCK_COMMENT"&&A!=="TK_COMMENT"){P=F?P:0;if(!N){P=1}for(var O=0;O<2-P;O++){Ab(false)}}if(A==="TK_WORD"){if(Ag==="get"||Ag==="set"||Ag==="new"||Ag==="return"){h()}else{Ab()}}else{if(A==="TK_OPERATOR"||Ag==="="){h()}else{if(e(D.mode)){}else{Ab()}}}a();B=o;break}if(o==="case"||(o==="default"&&D.in_case_statement)){if(Ag===":"||D.case_body){S()}else{if(!n){D.indentation_level--}Ab();if(!n){D.indentation_level++}}a();D.in_case=true;D.in_case_statement=true;D.case_body=false;break}if(A==="TK_END_BLOCK"){if(!Ae(o.toLowerCase(),["else","catch","finally"])){L="NEWLINE"}else{if(q==="expand"||q==="end-expand"||q==="expand-strict"){L="NEWLINE"}else{L="SPACE";h()}}}else{if(A==="TK_SEMICOLON"&&(D.mode==="BLOCK"||D.mode==="DO_BLOCK")){L="NEWLINE"}else{if(A==="TK_SEMICOLON"&&e(D.mode)){L="SPACE"}else{if(A==="TK_STRING"){L="NEWLINE"}else{if(A==="TK_WORD"){if(Ag==="else"){M(true)}L="SPACE"}else{if(A==="TK_START_BLOCK"){L="NEWLINE"}else{if(A==="TK_END_EXPR"){h();L="NEWLINE"}}}}}}}if(Ae(o,K)&&Ag!==")"){if(Ag==="else"){L="SPACE"}else{L="NEWLINE"}}if(D.if_line&&A==="TK_END_EXPR"){D.if_line=false}if(Ae(o.toLowerCase(),["else","catch","finally"])){if(A!=="TK_END_BLOCK"||q==="expand"||q==="end-expand"||q==="expand-strict"){Ab()}else{M(true);h()}}else{if(L==="NEWLINE"){if(Q(Ag)){h()}else{if(A!=="TK_END_EXPR"){if((A!=="TK_START_EXPR"||o!=="var")&&Ag!==":"){if(o==="if"&&B==="else"&&Ag!=="{"){h()}else{D.var_line=false;D.var_line_reindented=false;Ab()}}}else{if(Ae(o,K)&&Ag!==")"){D.var_line=false;D.var_line_reindented=false;Ab()}}}}else{if(b(D.mode)&&Ag===","&&Al==="}"){Ab()}else{if(L==="SPACE"){h()}}}}a();B=o;if(o==="var"){D.var_line=true;D.var_line_reindented=false;D.var_line_tainted=false}if(o==="if"){D.if_line=true}if(o==="else"){D.if_line=false}break;case"TK_SEMICOLON":a();D.var_line=false;D.var_line_reindented=false;if(D.mode==="OBJECT"){D.mode="BLOCK"}break;case"TK_STRING":if(A==="TK_END_EXPR"&&Ae(D.previous_mode,["(COND-EXPRESSION)","(FOR-EXPRESSION)"])){h()}else{if(A==="TK_COMMENT"||A==="TK_STRING"||A==="TK_START_BLOCK"||A==="TK_END_BLOCK"||A==="TK_SEMICOLON"){Ab()}else{if(A==="TK_WORD"){h()}}}a();break;case"TK_EQUALS":if(D.var_line){D.var_line_tainted=true}h();a();h();break;case"TK_COMMA":if(D.var_line){if(e(D.mode)||A==="TK_END_BLOCK"){D.var_line_tainted=false}if(D.var_line_tainted){a();D.var_line_reindented=true;D.var_line_tainted=false;Ab();break}else{D.var_line_tainted=false}a();h();break}if(A==="TK_COMMENT"){Ab()}if(A==="TK_END_BLOCK"&&D.mode!=="(EXPRESSION)"){a();if(D.mode==="OBJECT"&&Ag==="}"){Ab()}else{h()}}else{if(D.mode==="OBJECT"){a();Ab()}else{a();h()}}break;case"TK_OPERATOR":var X=true;var Ad=true;if(Q(Ag)){h();a();break}if(o==="*"&&A==="TK_UNKNOWN"&&!Al.match(/^\d+$/)){a();break}if(o===":"&&D.in_case){if(n){D.case_body=true}a();Ab();D.in_case=false;break}if(o==="::"){a();break}if(Ae(o,["--","++","!"])||(Ae(o,["-","+"])&&(Ae(A,["TK_START_BLOCK","TK_START_EXPR","TK_EQUALS","TK_OPERATOR"])||Ae(Ag,K)))){X=false;Ad=false;if(Ag===";"&&e(D.mode)){X=true}if(A==="TK_WORD"&&Ae(Ag,K)){X=true}if(D.mode==="BLOCK"&&(Ag==="{"||Ag===";")){Ab()}}else{if(o==="."){X=false}else{if(o===":"){if(D.ternary_depth===0){if(D.mode==="BLOCK"){D.mode="OBJECT"}X=false}else{D.ternary_depth-=1}}else{if(o==="?"){D.ternary_depth+=1}}}}if(X){h()}a();if(Ad){h()}break;case"TK_BLOCK_COMMENT":var d=u(o);var f;if(l(d.slice(1),"*")){Ab();H.push(d[0]);for(f=1;f<d.length;f++){Ab();H.push(" ");H.push(v(d[f]))}}else{if(d.length>1){Ab()}else{if(A==="TK_END_BLOCK"){Ab()}else{h()}}for(f=0;f<d.length;f++){H.push(d[f]);H.push("\n")}}if(Z("\n")!=="\n"){Ab()}break;case"TK_INLINE_COMMENT":h();a();if(e(D.mode)){h()}else{W()}break;case"TK_COMMENT":if(Ag===","&&!R){M(true)}if(A!=="TK_COMMENT"){if(R){Ab()}else{h()}}a();Ab();break;case"TK_UNKNOWN":if(Q(Ag)){h()}a();break}Al=Ag;A=E;Ag=o}var y=J+H.join("").replace(/[\r\n ]+$/,"");return y}if(typeof exports!=="undefined"){exports.js_beautify=js_beautify};