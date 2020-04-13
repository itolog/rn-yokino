const html = (src: any) => {
  return `
  <html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=yes" />
  <meta http-equiv="X-UA-Compatible" content="ie=edge" />
  <title>Player</title>
  <style>
    * {
      margin: 0;
      padding: 0;
    }

    html,
    body {
      height: 100%;
    }
    .wrapp-iframe {
      width: 100%;
      height: 100%;
      overflow: hidden;
    }

    .iframe {
      width: 100%;
      height: 100%;
    }
  </style>
</head>
<body>
  <div class='wrapp-iframe'>
    <iframe src=${src} class='iframe' frameborder="0" allowfullscreen></iframe>
  </div>
</body>
</html>
  `;
};

export default html;
