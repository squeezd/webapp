import {
  AiOutlineCloud,
  AiOutlineDashboard,
  AiOutlineLock,
} from 'react-icons/ai';

export default async function Home() {
  const reasons = [
    {
      reason: 'Keep Your link safely in our secure database.',
      Icon: AiOutlineCloud,
    },
    {
      reason: 'Easily enable and disable your links if needed.',
      Icon: AiOutlineLock,
    },
    {
      reason: "We won't keeps you waiting by watching ads",
      Icon: AiOutlineDashboard,
    },
  ];

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
            <div className="flex justify-between space-x-40 items-center">
              {reasons.map((r) => (
                <div
                  key={r.reason}
                  className="flex flex-col items-center mx-4 w-12"
                >
                  <r.Icon color="white" size="4em" />
                  <div className="text-center pt-8 font-medium w-40">
                    {r.reason}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
