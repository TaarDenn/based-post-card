export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_URL;

  const config = {
    accountAssociation: {
      header:
        "eyJmaWQiOjM2ODAzMiwidHlwZSI6ImN1c3RvZHkiLCJrZXkiOiIweDcyREE1MjcyQjA0NGM3MmEyNThkQTAwODljMEFmNTNCZTBhZTU5MTUifQ",
      payload: "eyJkb21haW4iOiJwb3N0LWNhcmQuZnVuIn0",
      signature:
        "MHg5NTUwMWEyNmUwYjJmYTYzNjE5MWI0NzUxZGU5NWExMTNmZDcwMDMxMmVmNDY2Y2E0ZTkzY2EwNmU5ODQ5N2YzMzIxNTdiNjdiOWZlNGNkMzViZTcxOTU1YmRiNjVjMjU5NjBiY2NkYTJhZTczODViMjliODljNWFiZDI3MWQ1MjFi",
    },
    frame: {
      version: "1",
      name: "PostCard.fun",
      iconUrl: `${appUrl}/icon.png`,
      homeUrl: appUrl,
      imageUrl: `${appUrl}/open-graph/og.png`,
      buttonTitle: "Post a Card to fren",
      splashImageUrl: `${appUrl}/splash/splash.png`,
      splashBackgroundColor: "#0052ff",
      webhookUrl: `${appUrl}/api/webhook`,
    },
  };

  return Response.json(config);
}
