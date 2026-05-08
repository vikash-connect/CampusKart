import StudentIdUpload from "@/components/StudentIdUpload";

export default function TestUploadPage() {
  return (
    <main className="min-h-screen bg-background py-20 px-6">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight text-foreground mb-4 md:text-5xl">
          Verification Center
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Securely upload your student credentials to start trading on CampusKart.
        </p>
      </div>

      <div className="flex flex-col items-center">
        <StudentIdUpload />
      </div>

      <div className="mt-16 max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-muted/30 border border-border">
          <h3 className="font-semibold text-foreground mb-2">Step 1</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Take a clear photo of your front-side student ID card.
          </p>
        </div>
        <div className="p-6 rounded-2xl bg-muted/30 border border-border">
          <h3 className="font-semibold text-foreground mb-2">Step 2</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Upload the file and wait for our team to verify your status.
          </p>
        </div>
      </div>
    </main>
  );
}
