import { useAppDispatch } from "@/store/hooks";
import { addPlayerTour } from "@/store/slice/GameSlice";
import { Select } from "flowbite-react";
import { Seed, SeedItem } from "react-brackets";

const CustomSeed = ({seed, breakpoint, roundIndex, seedIndex}: any) => {
    const dispatch = useAppDispatch()
    const matchId = seed.id
  
    // console.log(tour.map(tour => tour.matchs.map(match => match.id)))
  
    // onChange={e => dispatch(setFirstRound(e.target.value))}>
    //           {players.filter(player => !firstRound.seeds.filter(round => round === player.id).length)
    //             .map(player => <option value={player.id}>{player.name}</option>)}
  
    const change = (e: React.ChangeEvent<HTMLSelectElement>) => 
      dispatch(addPlayerTour({ playerId: +e.target.value, roundId: 1, matchId }))
  
    return (
      <Seed mobileBreakpoint={breakpoint}>
        <SeedItem>
          <div className='bg-white text-black py-2 px-4 gap-2 flex flex-col'>
  
            <Select className="w-full"
              onChange={e => change(e)}
            >
              {seed.players.map((player: any) => <option value={player.id}>{player.name}</option>)}
            </Select> 
  
          </div>
        </SeedItem>
      </Seed>
    );
};

export default CustomSeed