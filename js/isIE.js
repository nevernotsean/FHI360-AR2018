const isIE = () => {
  return (
    navigator.appName === 'Microsoft Internet Explorer' ||
    (navigator.appName === 'Netscape' &&
      new RegExp('Trident/.*rv:([0-9]{1,}[.0-9]{0,})').exec(navigator.userAgent) != null)
  );
};

export default isIE;
