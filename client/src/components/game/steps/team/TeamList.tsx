import { useAppSelector } from "@/store/hooks"
import Team from "./Team"

const TeamList = () => {
    const teams = useAppSelector((state) => state.game.game.teams)

    return <div className="w-1/3 max-h-96 overflow-scroll flex flex-col gap-3">
        {teams.map(({name}) => <Team key={name} label={name} />)}
    </div>
}

export default TeamList