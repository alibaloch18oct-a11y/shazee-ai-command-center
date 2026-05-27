export async function GET() {
  return Response.json({
    status: "ok",
    app: "Shazee AI Command Center",
    frontend: "online",
    backend: "nextjs-api-routes",
    platform: "Vercel",
    modules: {
      commandCenter: "enabled",
      aiChat: "enabled",
      admin: "enabled",
      analytics: "enabled",
      resumeReviewer: "enabled",
    },
    time: new Date().toISOString(),
  });
}