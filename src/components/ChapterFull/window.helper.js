class WindowHelper {
  static pageHeight() {
    return document.documentElement.offsetHeight;
  }

  static windowHeight() {
    return window.innerHeight;
  }

  static scrollPosition() {
    return (
      window.scrollY ||
      window.pageYOffset ||
      document.body.scrollTop +
        ((document.documentElement && document.documentElement.scrollTop) || 0)
    );
  }
}

export default WindowHelper;
