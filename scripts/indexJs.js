/*TYPES*/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var _this = this;
/****************************/
var planetsContainer = document.querySelector('[data-planetscontainer]');
var langChanger = document.querySelector('[data-lang]');
var targetElement;
var n = 1;
var dir = "ltr";
var displayPlanets = function () { return __awaiter(_this, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetchData()];
            case 1:
                planetsData = _a.sent();
                planetsData.map(function (planet) {
                    var s = "\n        <div class=\"planet\">\n            <button type=\"button\" data-close>Close</button>\n            <img data-planetimg src='" + planet.img + "' alt=\"" + planet.name[0] + "\" />\n            <span>" + (planet.id + 1) + "</span>\n            <div class=\"spacer\"></div>\n            <div class=\"planetContent\">\n                <div class=\"textPlanet\">\n                    <h2 style=\"direction:" + dir + "\">" + planet.name[n] + "</h2>\n                    <p style=\"direction:" + dir + "\">" + planet.describtion[n] + "</p>\n                </div>\n                <div data-info class=\"moreInfo\">\n                    <p style=\"direction:" + dir + "\"><strong>" + (planet.info[0].id + 1) + "- </strong>" + planet.info[0].text[n] + "</p>\n                    <p style=\"direction:" + dir + "\"><strong>" + (planet.info[1].id + 1) + "- </strong>" + planet.info[1].text[n] + "</p>\n                    <p style=\"direction:" + dir + "\"><strong>" + (planet.info[2].id + 1) + "- </strong>" + planet.info[2].text[n] + "</p>\n                </div>\n                \n            </div>\n            <div class=\"bgimg\">\n            <img data-bgimg src='" + planet.bgimg + "' alt=\"" + planet.name[0] + "\" />\n            </div>\n            <button data-button type=\"button\">Go</button>\n        </div>\n        ";
                    planetsContainer.innerHTML += s;
                });
                return [2 /*return*/];
        }
    });
}); };
var planetsData = [];
var fetchData = function () { return __awaiter(_this, void 0, void 0, function () {
    var getdata, data, actualData;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, fetch('../planetsData.json')];
            case 1:
                getdata = _a.sent();
                return [4 /*yield*/, getdata.json()];
            case 2:
                data = _a.sent();
                return [4 /*yield*/, data.planets];
            case 3:
                actualData = _a.sent();
                return [2 /*return*/, actualData];
        }
    });
}); };
function performAction() {
    var allElements = document.querySelectorAll("header,.mainContent h1 ,.planet");
    var buttons = document.querySelectorAll('[data-button]');
    var buttonsclose = document.querySelectorAll('[data-close]');
    var infoDivs = document.querySelectorAll('[data-info]');
    var hideElements = function () {
        var selectedEle = document.querySelector('[data-selected]');
        allElements.forEach(function (ele) {
            if (!(ele === selectedEle)) {
                ele.classList.add('hideElements');
            }
        });
    };
    var showElements = function () {
        var selectedEle = document.querySelector('[data-selected]');
        allElements.forEach(function (ele) {
            if (!(ele === selectedEle)) {
                ele.classList.remove('hideElements');
            }
        });
    };
    buttons.forEach(function (button, i) {
        button.onclick = function (e) {
            var eventElement = e.currentTarget;
            var planetElement = eventElement.parentElement;
            planetElement.setAttribute('data-selected', "");
            hideElements();
            planetElement.classList.add('scaleEle');
            setTimeout(function () {
                planetElement.classList.add('scaleAnimation');
            }, 1000);
            setTimeout(function () {
                infoDivs[i].classList.add('moreInfoShow');
            }, 2000);
        };
    });
    buttonsclose.forEach(function (button, i) {
        button.onclick = function (e) {
            var selectedEle = document.querySelector('[data-selected]');
            infoDivs[i].classList.remove('moreInfoShow');
            selectedEle.classList.remove('scaleAnimation');
            setTimeout(function () {
                showElements();
                selectedEle.classList.remove('scaleEle');
                selectedEle.removeAttribute("data-selected");
                planetsContainer.scrollTo(i * 200, 0);
            }, 1000);
        };
    });
}
window.addEventListener('load', function () { return __awaiter(_this, void 0, void 0, function () {
    var _this = this;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, displayPlanets()];
            case 1:
                _a.sent();
                performAction();
                langChanger.onclick = function () { return __awaiter(_this, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0:
                                if (!(n == 0)) return [3 /*break*/, 2];
                                n = 1;
                                dir = "ltr";
                                langChanger.innerHTML = "AR";
                                planetsContainer.innerHTML = "";
                                return [4 /*yield*/, displayPlanets()];
                            case 1:
                                _a.sent();
                                performAction();
                                return [3 /*break*/, 4];
                            case 2:
                                n = 0;
                                dir = "rtl";
                                langChanger.innerHTML = "EN";
                                planetsContainer.innerHTML = "";
                                return [4 /*yield*/, displayPlanets()];
                            case 3:
                                _a.sent();
                                performAction();
                                _a.label = 4;
                            case 4: return [2 /*return*/];
                        }
                    });
                }); };
                return [2 /*return*/];
        }
    });
}); });
