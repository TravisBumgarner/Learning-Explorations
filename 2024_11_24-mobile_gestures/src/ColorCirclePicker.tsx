import { useCallback, useEffect, useRef, useState } from "react";
import styled, { css } from "styled-components";

const COLORS = [
    "#FF0000",
    "#FFA500",
    "#FFFF00",
    "#008000",
    "#0000FF",
    "#FF0000"
]

const interpolateColor = (color1: string, color2: string, factor: number) => {
    const hex = (color: string) => parseInt(color.slice(1), 16);
    const r = (color: number) => (color >> 16) & 255;
    const g = (color: number) => (color >> 8) & 255;
    const b = (color: number) => color & 255;

    const color1Hex = hex(color1);
    const color2Hex = hex(color2);

    const r1 = r(color1Hex);
    const g1 = g(color1Hex);
    const b1 = b(color1Hex);

    const r2 = r(color2Hex);
    const g2 = g(color2Hex);
    const b2 = b(color2Hex);

    const rInterpolated = Math.round(r1 + factor * (r2 - r1));
    const gInterpolated = Math.round(g1 + factor * (g2 - g1));
    const bInterpolated = Math.round(b1 + factor * (b2 - b1));

    return `#${((1 << 24) + (rInterpolated << 16) + (gInterpolated << 8) + bInterpolated).toString(16).slice(1)}`;
};

const getColorAtRotation = (rotation: number) => {
    const normalizedRotation = (rotation % 360 + 360) % 360; // Normalize rotation to [0, 360)
    const position = normalizedRotation / 360 * (COLORS.length - 1);
    const index = Math.floor(position);
    const factor = position - index;

    const color1 = COLORS[index];
    const color2 = COLORS[(index + 1) % COLORS.length];

    return interpolateColor(color1, color2, factor);
};

enum Picker {
    SingleFinger = "SingleFinger",
    TwoFinger = "TwoFinger"
}

const ColorCirclePicker = () => {
    const circleRef = useRef<HTMLDivElement>(null);
    const [rotation, setRotation] = useState(0);
    const [picker, setpicker] = useState<Picker>(Picker.SingleFinger);
    const [selectedColor, setSelectedColor] = useState<string>(COLORS[0]);

    /**
     * Calculate rotation on circle using one finger and the center of the circle as an anchor point. 
     */
    const handleOneFinger = useCallback((event: TouchEvent) => {
        // Prevent scaling parent. 
        event.preventDefault();
        if (event.touches.length === 1) {
            const touch = event.touches[0];
            const rect = circleRef.current?.getBoundingClientRect();
            if (rect) {
                const x = touch.clientX - rect.left;
                const y = touch.clientY - rect.top;
                const rotation = Math.atan2(y - rect.height / 2, x - rect.width / 2) * 180 / Math.PI;
                setRotation(rotation);
                setSelectedColor(getColorAtRotation(rotation));
            }
        }
    }, [])

    /**
     * Calculate rotation on circle using two fingers and the line that passes through the two. 
     */
    const handleTwoFinger = useCallback((event: TouchEvent) => {
        // Prevent scaling parent. 
        event.preventDefault();
        if (event.touches.length === 2) {
            const rotation = Math.atan2(
                event.touches[0].pageY - event.touches[1].pageY,
                event.touches[0].pageX - event.touches[1].pageX
            ) * 180 / Math.PI;
            setRotation(rotation);
        }
    }, [])

    const toggleCallbacks = useCallback(() => {
        if (picker === Picker.SingleFinger) {
            circleRef.current?.removeEventListener("touchmove", handleTwoFinger);
            circleRef.current?.addEventListener("touchmove", handleOneFinger);
        } else {
            circleRef.current?.removeEventListener("touchmove", handleOneFinger);
            circleRef.current?.addEventListener("touchmove", handleTwoFinger);
        }
    }, [picker, handleOneFinger, handleTwoFinger])

    // Attach event listeners and cleanup handlers on mount and set initial color. 
    useEffect(() => {
        toggleCallbacks()
        setSelectedColor(getColorAtRotation(rotation));
        
        const circle = circleRef.current;
        return () => {
            circle?.removeEventListener("touchmove", handleOneFinger);
            circle?.removeEventListener("touchmove", handleTwoFinger);
        }
    }, [toggleCallbacks, rotation, handleOneFinger, handleTwoFinger])

    const handleTogglePickerClick = useCallback(() => {
        setpicker(previous => previous === Picker.SingleFinger ? Picker.TwoFinger : Picker.SingleFinger);

        toggleCallbacks()
    }, [toggleCallbacks]);


    return (<>
        <Wrapper>
            <Header>Rotate</Header>
            <CircleWrapper>
                <StyledCircleHole><HexColor $selectedColor={selectedColor}>{selectedColor}</HexColor></StyledCircleHole>
                <StyledCircle  rotation={rotation} ref={circleRef} />
            </CircleWrapper>
        <TogglesWrapper>
            <ToggleButton onClick={handleTogglePickerClick}>{picker === Picker.SingleFinger ? 'Use Two Fingers': "Use One Finger"}</ToggleButton>
        </TogglesWrapper>
        </Wrapper>
        </>
    )
}

const Header = styled.h1`
    font-weight: 900;
    font-size: 34px;
    text-align: center;
`

const Wrapper = styled.div`
    background-color: color-mix(in srgb, white, blue);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 16px;
    height: 100%;
    box-sizing: border-box;
`

const TogglesWrapper = styled.div` 
    display: flex;
    justify-content: end;
`

const ToggleButton = styled.button`
    margin: 5px;
    border: 0;
    border-radius: 5px;
    padding: 8px;
    font-size: 20px;
    width: 180px;
    background: #ddd;
    font-weight: 900;
`

const CircleWrapper = styled.div`
    display: grid;
    place-items: center;

`

const stackCircleCSS = css`
    grid-column: 1;
    grid-row: 1;
`

const StyledCircleHole = styled.div`
    pointer-events: none;
    ${stackCircleCSS}
    border-radius: 50%;
    background: white;
    width: 80%;
    aspect-ratio: 1/1;
    z-index: 2;
    display: flex;

`

const HexColor = styled.p<{$selectedColor: string}>`
    margin: auto;
    font-size: 24px;
    font-weight: 900;
    color: ${({$selectedColor}) => $selectedColor};
    text-shadow: 0 0 5px #AAA;
`

const StyledCircle = styled.div<{rotation: number}>`
    ${stackCircleCSS}
    border-radius: 50%;
    background: conic-gradient(${COLORS.join(", ")});
    width: 100%;
    aspect-ratio: 1/1;
    transform: rotate(${({rotation}) => rotation}deg);
    
`

export default ColorCirclePicker