import { Reason } from '@/app/_component/Reason';

export default async function Home() {
  return (
    <>
      <main className="min-h-screen">
        <div className="pt-24 flex flex-col items-center">
          <div className="pt-16 pb-8 text-4xl">
            Shorten your URL <b>within seconds !</b>
          </div>
          <div className="pb-16 text-xl flex-wrap max-w-[80%]">
            <b>Squeezd</b> enables you to make your own simple, shortened and
            easy to share links.
          </div>

          <div className="flex flex-col items-center space-y-10">
            <div className="text-3xl">
              Why <b>Squeezd</b> ?
            </div>
            <Reason />
          </div>
        </div>
      </main>
    </>
  );
}
