import { useEffect, useState } from "react";
import { Text, View, StyleSheet, Dimensions, Pressable } from "react-native";
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

export default function Index() {

    const [orientation, setOrientation] = useState("");

    useEffect(() => {
        const {width, height} = Dimensions.get("window");
        setOrientation(width > height ? "landscape" : "portrait");

        Dimensions.addEventListener("change", ({window: {width, height}}) => {
            setOrientation(width > height ? "landscape" : "portrait");
        })
    }, []);

    const [teams, setTeams] = useState({
        redSide: {
            score: 0,
            bgColor: "red",
            bgHighlight: "#fa2f2f"
        },
        blueSide: {
            score: 0,
            bgColor: "blue",
            bgHighlight: "#2f36f7"
        }
    })
    
  return (
    <View style={{...style.main, flexDirection: (orientation === "portrait" ? "column" : "row")}}>

        <Pressable
            style={{...style.teamSite, backgroundColor: teams.redSide.bgColor}}
            onPress={() => {
                setTeams({blueSide: {...teams.blueSide}, redSide: {...teams.redSide, score: (teams.redSide.score + 1)}});
            }}
        >
            <Text style={style.teamSiteText}>{teams.redSide.score}</Text>
        </Pressable>
        <Pressable 
            style={{...style.teamSite, backgroundColor: teams.blueSide.bgColor}}
            onPress={() => {
                setTeams({redSide: {...teams.redSide}, blueSide: {...teams.blueSide, score: (teams.blueSide.score + 1)}});
            }}
        >
            <Text style={style.teamSiteText}>{teams.blueSide.score}</Text>
        </Pressable>
        <Pressable 
            style={style.restartBtn}
            onPress={() => {
                setTeams({
                    blueSide: {...teams.blueSide, score: 0},
                    redSide: {...teams.redSide, score: 0},
                });
            }}
        >
            <MaterialCommunityIcons name="restart" size={42} color="black" /> 
        </Pressable>
    </View>
  );
}

const style = StyleSheet.create({
    main: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    teamSite: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        width: "100%",
        height: "100%"
    },
    teamSiteText: {
        color: "white", 
        fontSize: 64,
        fontWeight: "bold"
    },
    restartBtn: {
        position: "absolute",
        backgroundColor: "white",
        borderRadius: 8,
        padding: 4
    }
});
