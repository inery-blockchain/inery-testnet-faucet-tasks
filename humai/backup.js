<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>humai dApps</title>
    <link rel="icon" href="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhYJf2VHj24p6imyG1l9sc6sinGQyHLDNhdcGb6nDsYNkdTC1LUMBR9KB7i66JGDSI0iYgIh1u98lp_wsNns8fKT7SYPhByqOZgXH5dprQ7hHmh2gUIwY1E3_y_QxLxRfH_7oJ9KZQrQTVu6H0ZxrjEGP51pP3J0xgYF7KQIrOAfQCquLbxMkN-5MonXA/s180/favicon.png">
    <style>
        body {
            background-image: url("https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhx24aPmWJhvDEar-sYIlVA07g0AfixnHXKJAvsNaXryVZzFwpybGIX3xsiB5m_bnVEy9waZmWdd7R9-WnxXhecgmnFMJnmcvfqAKtmc6YfKMfFaRjzujQhG3LvnQ56cKTW8umpgHpK28mkmu-Sc5fnP56S6GAJCpWIeSXfSic4AmsjiENq5IEZ627-rg/s748/background.jpg");
            background-size: cover;
            font-family: Arial, sans-serif;
            font-size: 16px;
            color: #333;
        }
        table {
            margin: 20px auto;
            border-collapse: collapse;
            background-color: #fff;
            box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.5);
        }
        th, td {
            padding: 10px;
            text-align: left;
            border-bottom: 1px solid #ddd;
        }
        th {
            background-color: #007bff;
            color: #fff;
        }
        td:first-child {
            font-weight: bold;
        }
        button {
            margin-top: 20px;
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #0056b3;
        }
    </style>
</head>

<body>

  <h1>Get Info Demo</h1>

  <button onclick="getInfo()">Get Info</button>

  <br><br>

  <table border="1">
    <tr>
      <th>Field</th>
      <th>Value</th>
    </tr>
    <tbody id="info-table">
    </tbody>
  </table>

  <script>
    async function getInfo() {
      const requestOptions = {
        method: 'POST',
        headers: {
          'Accept': 'application/json'
        }
      };

      const response = await fetch('https://master1.blockchain-servers.world/v1/chain/get_info', requestOptions);
      const data = await response.json();

      let tableBody = '';
      for (let key in data) {
        tableBody += `
          <tr>
            <td>${key}</td>
            <td>${JSON.stringify(data[key])}</td>
          </tr>
        `;
      }
      document.getElementById('info-table').innerHTML = tableBody;
    }
  </script>


</body>
</html>
