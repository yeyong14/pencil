function PageThumbnailView() {
    BaseTemplatedWidget.call(this);
    this.bind("load", function (event) {
        var W = this.pageThumbnailContainer.offsetWidth - 2;
        var H = this.pageThumbnailContainer.offsetHeight - 2;
        var w = this.pageThumbnail.naturalWidth;
        var h = this.pageThumbnail.naturalHeight;

        var r = Math.min(w/W, h/H);

        w /= r;
        h /= r;

        this.pageThumbnail.style.width = w + "px";
        this.pageThumbnail.style.height = h + "px";

        this.pageThumbnail.style.left = (W - w) / 2 + "px";
        this.pageThumbnail.style.top = (H - h) / 2 + "px";

        this.pageThumbnail.style.visibility = "visible";
    }, this.pageThumbnail);

    this.pageThumbnail.style.visibility = "hidden";


}
__extend(BaseTemplatedWidget, PageThumbnailView);

PageThumbnailView.prototype.setPage = function (page, childMenu) {
    this.page = page;
    this.childMenu = childMenu;
    this._updateUI();

    if (this.page.children.length > 0) {
        this.bind("click",function (event) {
            this.childMenu.showMenu(this.pageActionButton,"left-inside", "top", 0, 0, true);
        },this.pageActionButton)
    } else {
        this.pageActionButton.style.visibility = "hidden";
    }
};
PageThumbnailView.prototype._updateUI = function () {
    if (!this.page) return;
    this.pageThumbnail.style.visibility = "hidden";
    this.pageThumbnail.src = this.page.thumbPath + "?time=" + (new Date().getTime());
    this.pageTitle.innerHTML = this.page.name;
};

PageThumbnailView.prototype.selectPage = function (active) {
    this.node().setAttribute("selected", active);
    this.pageThumbnailContainer.setAttribute("selected", active);
    this.pageTitle.setAttribute("selected", active);
};
